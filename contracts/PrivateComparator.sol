// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, ebool, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

contract PrivateComparator is SepoliaConfig {
    euint32 private a;
    euint32 private b;

    function setValues(
        externalEuint32 extA,
        externalEuint32 extB,
        bytes calldata proofA,
        bytes calldata proofB
    ) public {
        a = FHE.fromExternal(extA, proofA);
        b = FHE.fromExternal(extB, proofB);
    }
function isAGreater() public returns (ebool) {
    return FHE.gt(a, b);
}

function isALess() public returns (ebool) {
    return FHE.lt(a, b);
}

function isAEqual() public returns (ebool) {
    return FHE.eq(a, b);
}

}
