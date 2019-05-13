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
	maxBlockWeight: 20000000, //20MB
	targetBlockTimeSeconds: 150, //2.5min
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"BTX":currencyUnits[0], "mBTX":currencyUnits[1], "bits":currencyUnits[2], "sat":currencyUnits[3]},
	baseCurrencyUnit:currencyUnits[3],
	defaultCurrencyUnit:currencyUnits[0],
	feeSatoshiPerByteBucketMaxima: [5, 10, 25, 50, 100, 150, 200, 250],
	genesisBlockHash: "604148281e5c4b7f2487e5d03cd60d8e6f69411d613f6448034508cea52e9574",
	genesisCoinbaseTransactionId: "1669526520b4e037738825c5f09c01c8f6ef6a3a5ee552e65e6d0141507987c7",
	genesisCoinbaseTransaction: {
		"hex": "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4004ffff001d010438506f77657264652062792042697473656e642d4575726f7065636f696e2d4469616d6f6e642d4d41432d42332032332f4170722f32303137ffffffff010000000000000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000",
		"txid": "1669526520b4e037738825c5f09c01c8f6ef6a3a5ee552e65e6d0141507987c7",
		"hash": "1669526520b4e037738825c5f09c01c8f6ef6a3a5ee552e65e6d0141507987c7",
		"blockhash": "604148281e5c4b7f2487e5d03cd60d8e6f69411d613f6448034508cea52e9574",
		"version": 1,
		"size": 191,
		"vsize": 191,
		"locktime":0,
		"time": 1492973331,
		"blocktime": 1492973331,
		"confirmations":380198,
		"vin": [
			{
				"coinbase": "04ffff001d010438506f77657264652062792042697473656e642d4575726f7065636f696e2d4469616d6f6e642d4d41432d42332032332f4170722f32303137",
				"sequence": 4294967295
			}
		],
		"vout": [
			{
				"value": 0.00000000,
				"n": 0,
				"scriptPubKey": {
					"asm": "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f OP_CHECKSIG",
					"hex": "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
					"reqSigs": 1,
					"type": "pubkey",
					"addresses": [
						"2N2oLLYFCwfH81SUReTcuhtoEHgwHYHQNq"
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
			type: "blockheight",
			date: "2017-05-10",
			txid: "ce385e55fb2a73fa438426145b074f08314812fa3396472dc572b3079e26e0f9",
			summary: "First SegWit transaction.",
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
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(50) ];
		var index = 1;
		var BTXFullblock = (42987 + 10000)*4;
		var halvings = (blockHeight + BTXFullblock) / 840000;
		if (blockHeight == 1)
		{
			eras = [ new Decimal8(16287337.5) ];
			return eras[index];
		}
		else if (blockHeight <= 10000)
		{
			return eras[index]; //default
		}
		else if (blockHeight > 10000)
		{
			eras = [ new Decimal8(3.25) ];
			if (halvings >= 256)
			{
				eras = [ new Decimal8(0) ];
				return eras[index];
			}
			index = Math.floor((blockHeight + BTXFullblock) / 840000);
			return eras[index]; //Todo sollte im default 3.25 rauskommen
		}
		/*
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 210000);

		return eras[index];
		*/
	}
};
