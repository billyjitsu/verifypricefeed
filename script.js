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

  const beaconId = ethers.utils.solidityKeccak256(['bytes32', 'address'], [templateId, AirnodeAddress]);
  // If you're using Ethers 6, you can use the commented-out line below instead
  // const beaconId = ethers.utils.solidityPackedKeccak256(['bytes32', 'address'], [templateId, AirnodeAddress]);

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


//Verify Beacon Set:
const beaconSetId = ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(['bytes32[]'],[[TwelveDataID.beaconId, NewChangeID.beaconId, dxFeedID.beaconId, kaikoID.beaconId, nodaryID.beaconId, finageID.beaconId, coinpaprikaID.beaconId]]));
console.log("BeaconSet:", beaconSetId);