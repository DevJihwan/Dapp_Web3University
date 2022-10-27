// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Completion is ERC721 {
    uint256 public tokenCounter;
    //모든 NFT는 tokenId와 URI가 맵핑됨. 그때 맵핑하기 위해 먼저 정의.
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        tokenCounter = 0;
    }

    /*
     * NFT 민팅
     */
    function mint(string memory _tokenURI) public {
        /*
         * param : to, tokenId(newly minted NFT)
         * msg.sender = address of the account calling the smart contract
         */
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI);

        //NFT가 민팅될 때마다 tokenCounter를 1씩증가시키고 tokenId에 사용
        tokenCounter++;
    }

    /*
     * 용어 설명
     * internal : 이 함수는 이 스마트컨트랙트에서만 쓰겠다고 선언
     * virtual : 이 스마트 컨트랙트를 상속받은 스마트컨트랙에서는 사용할 수 있음.
     */
    function _setTokenURI(uint256 _tokenId, string memory _tokenURI)
        internal
        virtual
    {
        // require : if문 과 비슷, 구문안에 코드가 참인 경우 작동, false면 에러
        require(
            // _exists : _tokenId가 전달되면 true
            _exists(_tokenId),
            "ERC721Metadata : URI set of nonexistent token"
        );
        _tokenURIs[_tokenId] = _tokenURI;
    }

    /*
     * param : tokenId
     * param으로 받은 값으로 URI 생성
     */
    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata : URI set of nonexistent token"
        );
        return _tokenURIs[_tokenId];
    }
}
