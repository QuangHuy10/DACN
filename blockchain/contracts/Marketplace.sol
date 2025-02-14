// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import { ItemStatus, MarketItem, MarketItemParams, IMarketplace } from "./interfaces/IMarketplace.sol";
import "./libraries/Helper.sol";
import "./utils/Permission.sol";

contract Marketplace is Permission, ReentrancyGuard, IERC721Receiver, IMarketplace {
    using Counters for Counters.Counter;

    // Variables
    address public treasury; // the account that receives fees
    uint256 public royaltyPercent; // the fee percentage on sales
    Counters.Counter public itemIds;

    uint16 public constant HUNDRED_PERCENT = 10000;
    uint256 public constant MAX_BATCH_PURCHASE_ITEM = 15;

    // itemId -> Item
    mapping(uint256 => MarketItem) public marketItems;

    event ListedItem(uint256 indexed itemId, MarketItemParams marketItem);
    event PurchasedItem(uint256 indexed itemId, address indexed buyer);
    event ClosedItem(uint256 indexed itemId);
    event ForceRemovedItem(uint256 indexed itemId);
    event UpdatedItem(uint256 indexed itemId, uint256 price, uint256 timeSaleStart, uint256 timeSaleEnd, uint256 salePrice);
    event SetTreasury(address oldTreasury, address newTreasury);
    event SetRoyaltyPercent(uint256 oldRoyaltyPercent, uint256 newRoyaltyPercent);

    modifier onlySeller(uint256 _itemId) {
        require(marketItems[_itemId].seller == _msgSender(), "Caller is not seller");
        _;
    }

    modifier validMarketItem(uint256 _itemId) {
        require(marketItems[_itemId].itemId > 0, "Invalid item id");
        require(marketItems[_itemId].status == ItemStatus.OPENING, "Item is not opening");
        _;
    }

    constructor(address _treasury, uint256 _royaltyPercent) {
        treasury = _treasury;
        royaltyPercent = _royaltyPercent;
    }

    function listItem(MarketItemParams memory _marketItemParams) external {
        require(_marketItemParams.price > 0, "Invalid price");
        if (_marketItemParams.timeSaleStart > 0) {
            require(_marketItemParams.timeSaleEnd > _marketItemParams.timeSaleStart, "Invalid time sale");
            require(_marketItemParams.salePrice > 0 && _marketItemParams.salePrice < _marketItemParams.price, "Invalid sale price");
        }

        itemIds.increment();
        marketItems[itemIds.current()] = MarketItem({
            itemId: itemIds.current(),
            nft: _marketItemParams.nft,
            tokenId: _marketItemParams.tokenId,
            price: _marketItemParams.price,
            timeSaleStart: _marketItemParams.timeSaleStart,
            timeSaleEnd: _marketItemParams.timeSaleEnd,
            salePrice: _marketItemParams.salePrice,
            seller: _msgSender(),
            feeReceiver: _marketItemParams.feeReceiver,
            buyer: address(0),
            timePurchased: 0,
            status: ItemStatus.OPENING
        });
        IERC721(_marketItemParams.nft).transferFrom(_msgSender(), address(this), _marketItemParams.tokenId);
        emit ListedItem(itemIds.current(), _marketItemParams);
    }

    function _purchaseItem(uint256 _itemId) private validMarketItem(_itemId) {
        marketItems[_itemId].status = ItemStatus.SOLD;
        marketItems[_itemId].buyer = _msgSender();
        marketItems[_itemId].timePurchased = block.timestamp;

        uint256 itemPrice = marketItems[_itemId].price;
        if (marketItems[_itemId].timeSaleStart <= block.timestamp && block.timestamp <= marketItems[_itemId].timeSaleEnd) {
            itemPrice = marketItems[_itemId].salePrice;
        }

        uint256 royaltyFee = (itemPrice * royaltyPercent) / HUNDRED_PERCENT;
        Helper.safeTransferNative(treasury, royaltyFee);
        Helper.safeTransferNative(marketItems[_itemId].feeReceiver, itemPrice - royaltyFee);

        IERC721(marketItems[_itemId].nft).transferFrom(address(this), _msgSender(), marketItems[_itemId].tokenId);

        emit PurchasedItem(_itemId, _msgSender());
    }

    function purchaseItems(uint256[] memory _itemIds) external payable nonReentrant {
        require(_itemIds.length <= MAX_BATCH_PURCHASE_ITEM, "Reach max batch purchase");
        for (uint256 i = 0; i < _itemIds.length; i++) {
            _purchaseItem(_itemIds[i]);
        }
    }

    function closeItem(uint256 _itemId) external onlySeller(_itemId) validMarketItem(_itemId) {
        marketItems[_itemId].status = ItemStatus.CLOSED;

        IERC721(marketItems[_itemId].nft).transferFrom(address(this), _msgSender(), marketItems[_itemId].tokenId);
        emit ClosedItem(marketItems[_itemId].itemId);
    }

    function updateItem(uint256 _itemId, uint256 _price, uint256 _timeSaleStart, uint256 _timeSaleEnd, uint256 _salePrice) external onlySeller(_itemId) validMarketItem(_itemId) {
        require(_price > 0, "Invalid price");
        if (_timeSaleStart > 0) {
            require(_timeSaleEnd > _timeSaleStart, "Invalid time sale");
            require(_salePrice > 0 && _salePrice < _price, "Invalid sale price");
        }

        marketItems[_itemId].price = _price;
        marketItems[_itemId].timeSaleStart = _timeSaleStart;
        marketItems[_itemId].timeSaleEnd = _timeSaleEnd;
        marketItems[_itemId].salePrice = _salePrice;

        emit UpdatedItem(_itemId, _price, _timeSaleStart, _timeSaleEnd, _salePrice);
    }

    function forceRemoveItem(uint256 _itemId) external onlyOwner validMarketItem(_itemId) {
        delete marketItems[_itemId];

        IERC721(marketItems[_itemId].nft).transferFrom(address(this), _msgSender(), marketItems[_itemId].tokenId);
        emit ForceRemovedItem(marketItems[_itemId].itemId);
    }

    function setTreasury(address _treasury) external onlyOwner {
        address _oldTreasury = treasury;
        treasury = _treasury;

        emit SetTreasury(_oldTreasury, _treasury);
    }

    function setRoyaltyPercent(uint256 _royaltyPercent) external onlyOwner {
        uint256 _oldRoyaltyPercent = royaltyPercent;
        royaltyPercent = _royaltyPercent;

        emit SetRoyaltyPercent(_oldRoyaltyPercent, _royaltyPercent);
    }

    function onERC721Received(address, address, uint256, bytes calldata) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
