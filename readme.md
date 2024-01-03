## Verify Price Feeds

This code snippet is designed verify the sources of the price feed and match it to the Data Feed ID of each individual dAPI feed.  It demonstrates how to encode parameters, generate template and beacon IDs, and create a sorted array of beacon IDs for further use. 
- [API3 dAPI Marketplace]('https://market.api3.org/dapis?statuses=managed')


## Prerequisites

Before using this script, ensure that you have the following prerequisites installed:

- Node.js
- ethers.js library
- @api3/airnode-abi library

## Installation

1. Clone the repository or download the code to your local machine.
2. Install the required dependencies by running `npm install` in the root directory of the project.

## Usage

To use this script:

1. Import the required modules from ethers.js and @api3/airnode-abi.
2. Set up your API details and endpoints in the `PriceFeeds` directory for each price feed source. Example [ETH/USD]('https://market.api3.org/dapis/gnosis/ETH-USD') and selecting `Sources`
3. Once filled out each data feed provider for the data feed, you can run the script by running the command `node script.js`
4. It will return the `BeaconSet ID` that you can verify on the price feed page.

