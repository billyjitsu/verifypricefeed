import { encode } from '@api3/airnode-abi';
import { ethers } from 'ethers';

import {twelveDataAirnodeAddress, twelveDataEndpointId, twelveDataDecodedParameters, twelveDataTemplateID} from './PriceFeeds/TwelveData.js';
import {newChangeAirnode, newChangeEndpoint, newChangedecodedParameters, newChangeTemplateID} from './PriceFeeds/NewChangeFX.js';
import {dxFeedAirnode, dxFeedEndpoint, dxFeeddecodedParameters, dxFeedTemplateID} from './PriceFeeds/dxFeed.js';
import { kaikoAirnodeAddress, kaikoEndpointId, kaikoDecodedParameters, kaikoTemplateID } from './PriceFeeds/Kaiko.js';
import { nodaryAirnodeAddress, nodaryEndpointId, nodaryDecodedParameters, nodaryTemplateID } from './PriceFeeds/Nodary.js';
import { finageAirnodeAddress, finageEndpointId, finageDecodedParameters, finageTemplateID } from './PriceFeeds/Finage.js';
import { coinpaprikaAirnodeAddress, coinpaprikaEndpointId, coinpaprikaDecodedParameters, coinpaprikaTemplateID } from './PriceFeeds/Coinpaprika.js';


function generateIds(decodedParameters, endpointId, AirnodeAddress) {
  const encodedParameters = encode(decodedParameters);
  
  const templateId = ethers.utils.solidityKeccak256(['bytes32', 'bytes'], [endpointId, encodedParameters]);
  // If you're using Ethers 6, you can use the commented-out line below instead
  // const templateId = ethers.utils.solidityPackedKeccak256(['bytes32', 'bytes'], [endpointId, encodedParameters]);

  const beaconId = ethers.utils.solidityKeccak256(['address','bytes32'], [ AirnodeAddress, templateId]);
  // If you're using Ethers 6, you can use the commented-out line below instead
  // const beaconId = ethers.utils.solidityPackedKeccak256(['address','bytes32'], [ AirnodeAddress, templateId]);

  return {
    templateId: templateId,
    beaconId: beaconId
  };
}

// Usage
const TwelveDataID = generateIds(twelveDataDecodedParameters, twelveDataEndpointId, twelveDataAirnodeAddress);
  // console.log("Twelve Data template ID:", TwelveDataID.templateId);
  console.log("Twelve Data Beacon ID:", TwelveDataID.beaconId);
  if(TwelveDataID.templateId === twelveDataTemplateID){
      console.log("**Template ID Matches**");
  }

const NewChangeID = generateIds(newChangedecodedParameters, newChangeEndpoint, newChangeAirnode);
  // console.log('New Change template ID:', NewChangeID.templateId);
  console.log('New Change Beacon ID:', NewChangeID.beaconId);
  if(NewChangeID.templateId === newChangeTemplateID){
      console.log("**Template ID Matches**");
  }

const dxFeedID = generateIds(dxFeeddecodedParameters, dxFeedEndpoint, dxFeedAirnode);
  // console.log("dxFeed template ID:", dxFeedID.templateId);
  console.log("dxFeed Beacon ID:", dxFeedID.beaconId);
  if(dxFeedID.templateId === dxFeedTemplateID){
      console.log("**Template ID Matches**");
  }

const kaikoID = generateIds(kaikoDecodedParameters, kaikoEndpointId, kaikoAirnodeAddress);
  // console.log("Kaiko template ID:", kaikoID.templateId);
  console.log("Kaiko Beacon ID:", kaikoID.beaconId);
  if(kaikoID.templateId === kaikoTemplateID){
      console.log("**Template ID Matches**");
  }

const nodaryID = generateIds(nodaryDecodedParameters, nodaryEndpointId, nodaryAirnodeAddress);
  // console.log("Nodary template ID:", nodaryID.templateId);
  console.log("Nodary Beacon ID:", nodaryID.beaconId);
  if(nodaryID.templateId === nodaryTemplateID){
      console.log("**Template ID Matches**");
  }

const finageID = generateIds(finageDecodedParameters, finageEndpointId, finageAirnodeAddress);
  // console.log("Finage template ID:", finageID.templateId);
  console.log("Finage Beacon ID:", finageID.beaconId);
  if(finageID.templateId === finageTemplateID){
      console.log("**Template ID Matches**");
  }

const coinpaprikaID = generateIds(coinpaprikaDecodedParameters, coinpaprikaEndpointId, coinpaprikaAirnodeAddress);
  // console.log("Coinpaprika template ID:", coinpaprikaID.templateId);
  console.log("Coinpaprika Beacon ID:", coinpaprikaID.beaconId);
  if(coinpaprikaID.templateId === coinpaprikaTemplateID){
      console.log("**Template ID Matches**");
  }

const beaconIds = [
    TwelveDataID.beaconId,
    NewChangeID.beaconId,
    dxFeedID.beaconId,
    kaikoID.beaconId,
    nodaryID.beaconId,
    finageID.beaconId,
    coinpaprikaID.beaconId
];

if(beaconIds.length > 1){
  // Sort the beacon IDs in ascending order of their hex values
  beaconIds.sort((a, b) => {
    const bigA = BigInt(a);
    const bigB = BigInt(b);
    if (bigA > bigB) return 1;
    if (bigA < bigB) return -1;
    return 0;
  });

  // Now beaconIds array is sorted from smallest to largest in hex value
  console.log("Sorted Beacon IDs:", beaconIds);

  // Use the sorted array for beaconSetId
  const beaconSetId = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(['bytes32[]'], [beaconIds])
  );
  console.log("BeaconSet:", beaconSetId);
} else {
  console.log("BeaconSet:", beaconIds[0]);
}
