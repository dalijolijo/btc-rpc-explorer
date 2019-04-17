var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:8, rounding:8 });

var currencyUnits = [
	{
		type:"native",
		name:"BTX",
		multiplier:1,
		default:true,
		values:["", "btx", "BTX"],
		decimalPlaces:8
	},
	{
		type:"native",
		name:"mBTX",
		multiplier:1000,
		values:["mbtc"],
		decimalPlaces:5
	},
	{
		type:"native",
		name:"bits",
		multiplier:1000000,
		values:["bits"],
		decimalPlaces:2
	},
	{
		type:"native",
		name:"sat",
		multiplier:100000000,
		values:["sat", "satoshi"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:2,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:2,
		symbol:"€"
	},
];

module.exports = {
	name:"Bitcore",
	ticker:"BTX",
	logoUrl:"/img/logo/btx.svg",
	siteTitle:"Bitcore Explorer",
	nodeTitle:"Bitcore Full Node",
	nodeUrl:"https://bitcore.cc/",
	demoSiteUrl: "https://ltc.chaintools.io",
	miningPoolsConfigUrls:[
		"https://raw.githubusercontent.com/hashstream/pools/master/pools.json",
	],
	maxBlockWeight: 4000000, //TODO
	targetBlockTimeSeconds: 150, //BTX
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"BTX":currencyUnits[0], "mBTX":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "604148281e5c4b7f2487e5d03cd60d8e6f69411d613f6448034508cea52e9574", //BTX
	genesisCoinbaseTransactionId: "1669526520b4e037738825c5f09c01c8f6ef6a3a5ee552e65e6d0141507987c7", //BTX
	genesisCoinbaseTransaction: {
		"txid":"1669526520b4e037738825c5f09c01c8f6ef6a3a5ee552e65e6d0141507987c7", //BTX
		"hash":"04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f", //BTX
		"blockhash":"604148281e5c4b7f2487e5d03cd60d8e6f69411d613f6448034508cea52e9574", //BTX
		"version":1, //BTX
		"locktime":0, //BTX
		"size":272, //TODO
		"vsize":272, //TODO
		"time":1317972665, //TODO
		"blocktime":1317972665, //TODO 
		"vin":[
			{
				"prev_out":{
					"hash":"0000000000000000000000000000000000000000000000000000000000000000", //BTX
					"n":4294967295 //TODO
				}, //coinbase BTX
				"coinbase":"04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73"
			}
		],
		"vout":[
			{
				"value":"0.00000000", //TODO
				"n":0,
				"scriptPubKey":{ //TODO
					"hex":"040184710fa689ad5023690c80f3a49c8f13f8d45b8c857fbcbc8bc4a8e4d3eb4b10f4d4604fa08dce601aaf0f470216fe1b51850b4acf21b179c45070ac7b03a9 OP_CHECKSIG",
					"type":"pubkey",
					"reqSigs":1, //TODO
					"addresses":[
						"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" //TODO
					]
				}
			}
		]
	},
	historicalData: [
		{
			type: "blockheight",
			date: "2017-23-04",
			blockHeight: 0,
			blockHash: "604148281e5c4b7f2487e5d03cd60d8e6f69411d613f6448034508cea52e9574",
			summary: "The Bitcore genesis block.",
			alertBodyHtml: "This is the first block in the Bitcore blockchain.",
			referenceUrl: ""
		},
		{
			type: "tx", //TODO
			date: "2017-05-10",
			txid: "ce385e55fb2a73fa438426145b074f08314812fa3396472dc572b3079e26e0f9",
			summary: "First SegWit transaction.",
			referenceUrl: ""
		},
		{
			type: "blockheight", //TODO
			date: "2011-10-13",
			blockHeight: 448,
			blockHash: "6995d69ce2cb7768ef27f55e02dd1772d452deb44e1716bb1dd9c29409edf252",
			summary: "The first block containing a (non-coinbase) transaction.",
			referenceUrl: ""
		}
	],
	exchangeRateData:{
		jsonUrl:"https://api.coinmarketcap.com/v1/ticker/Bitcore/",
		exchangedCurrencyName:"usd",
		responseBodySelectorFunction:function(responseBody) {
			if (responseBody[0] && responseBody[0].price_usd) {
				return {"usd":responseBody[0].price_usd};
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) { //TODO
		var eras = [ new Decimal8(50) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 840000);

		return eras[index];
	}
};
