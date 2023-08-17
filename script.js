import { encode } from '@api3/airnode-abi';
import { ethers } from 'ethers';

import { AirnodeAddress, endpointId, decodedParameters, TemplateID} from './PriceFeeds/TwelveData.js';
import {newChangeAirnode, newChangeEndpoint, newChangedecodedParameters, NewChangeTemplateID} from './PriceFeeds/NewChangeFX.js';
import {dxFeedAirnode, dxFeedEndpoint, dxFeeddecodedParameters, dxFeedTemplateID} from './PriceFeeds/dxFeed.js';


function generateIds(decodedParameters, endpointId, AirnodeAddress) {
  const encodedParameters = encode(decodedParameters);
  
  const templateId = ethers.utils.solidityKeccak256(['bytes32', 'bytes'], [endpointId, encodedParameters]);
  // If you're using Ethers 6, you can use the commented-out line below instead
  // const templateId = ethers.utils.solidityPackedKeccak256(['bytes32', 'bytes'], [endpointId, encodedParameters]);

  const beaconId = ethers.utils.solidityKeccak256(['bytes32', 'address'], [templateId, AirnodeAddress]);
  // If you're using Ethers 6, you can use the commented-out line below instead
  // const beaconId = ethers.utils.solidityPackedKeccak256(['bytes32', 'address'], [templateId, AirnodeAddress]);

  return {
    templateId: templateId,
    beaconId: beaconId
  };
}

// Usage
const ids = generateIds(decodedParameters, endpointId, AirnodeAddress);
console.log("Twelve Data template ID:", ids.templateId);
console.log("Twelve Data Beacon ID:", ids.beaconId);

const NewChangeID = generateIds(newChangedecodedParameters, newChangeEndpoint, newChangeAirnode);
console.log('New Change template ID:', NewChangeID.templateId);
console.log('New Change Beacon ID:', NewChangeID.beaconId);

const dxFeedID = generateIds(dxFeeddecodedParameters, dxFeedEndpoint, dxFeedAirnode);
console.log("dxFeed template ID:", dxFeedID.templateId);
console.log("dxFeed Beacon ID:", dxFeedID.beaconId);


//Verify Beacon Set:
const beaconSetId = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(['bytes32[]'],[[ids.beaconId, NewChangeID.beaconId, dxFeedID.beaconId]]));
console.log("BeasonSet:", beaconSetId);