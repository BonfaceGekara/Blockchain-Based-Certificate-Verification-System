// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateVerification {
    struct CertificateRecord {
        string certificateNumber;
        bytes32 hash;
        uint256 timestamp;
    }

    mapping(string => CertificateRecord) private certificates;

    event CertificateStored(
        string certificateNumber,
        bytes32 hash,
        uint256 timestamp
    );

    function storeCertificate(
        string memory _certificateNumber,
        bytes32 _hash
    ) public {
        certificates[_certificateNumber] = CertificateRecord({
            certificateNumber: _certificateNumber,
            hash: _hash,
            timestamp: block.timestamp
        });

        emit CertificateStored(_certificateNumber, _hash, block.timestamp);
    }

    function verifyCertificate(
        string memory _certificateNumber,
        bytes32 _hash
    ) public view returns (bool) {
        return certificates[_certificateNumber].hash == _hash;
    }

    function getCertificateHash(
        string memory _certificateNumber
    ) public view returns (bytes32) {
        return certificates[_certificateNumber].hash;
    }

    function getCertificate(
        string memory _certificateNumber
    ) public view returns (string memory, bytes32, uint256) {
        CertificateRecord memory cert = certificates[_certificateNumber];

        return (cert.certificateNumber, cert.hash, cert.timestamp);
    }
}