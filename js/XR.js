var url = "https://docs.google.com/spreadsheets/d/1U7U-us9KhN6Z18hj1UQ9cwVbFbKvmoDbSEea70J1fIc/edit?usp=sharing";
gooss.data(
    {
        exchangerates: {
            url: url,
            index: 1
        }
    },


    // Call back function with data being the retrieved data
    function (err, data) {
        if (err) return alert(err);

        // data = 
        //{ 
            // "exchangerates" : {
            //  [
            //    {
            //     "From \\ To": "AED",
            //     "AED": 1,
            //     "ATOM": 0.06862249939612201,
            //     "AUD": 0.3789318662670201,
            //     "AZN": 0.46412513795090743, ...
            //    },
            //
            //    {
            //      "From \\ To": "MYR",
            //      "AED": 0.06862249939612201,
            //      "ATOM": 0.06862249939612201,
            //      "AUD": 0.3789318662670201,
            //      "AZN": 0.46412513795090743, ...
            //    }, 
            //      ...
            //  ]
        //}

        // getObj retrieves object where one of the KEY is equal to VAL
        // e.g: "From \\ To" === "MYR" 
        // For loop fastest approach  compared to foreach, filter, reduce, find ...
        function getObj(arr, key, val){
            for (var i =0; i<arr.length; i++){
                if(arr[i][key] === val){
                    return arr[i];
                }
            }
        }
        
        // Retrieves exchange rate using Google Sheet
        function getXR(from, to){
            let rates = getObj(data.exchangerates, "From \\ To", from);
            
            return rates[to];
        };

        function buyXR(from, to){
            let rates = getXR(from,to);
            rates = rates*.9998+"";
            return rates.substr(0,7);
        }
        function sellXR(from, to){
            let rates = getXR(from,to);
            rates = rates*1.0001+"";
            return rates.substr(0,7);
        }
        
        // Example Usage
        console.log("MYR to SGD : " + getXR("MYR", "SGD"));
        console.log("THB to USD : " + getXR("THB", "USD"));
        console.log("GBP to MYR : " + getXR("GBP", "MYR"));
        // document.getElementById("output").innerHTML = JSON.stringify(data, null, 2);


        var currency_table = [
			{'name': 'Singapore Dollar',
			 'abbv': 'SGD',
			 'credit': '0.3310',
			 'cash':'0.3310',
			 'buy':buyXR("SGD","MYR"),
			 'sell':sellXR("SGD", "MYR"),
			 'link':'https://www.countryflags.io/sg/flat/64.png'},

			 {'name': 'UA.Emirates Dirham',
			 'abbv': 'AED',
			 'credit': '0.8600',
			 'cash':'0.8600',
			 'buy':buyXR("AED","MYR"),
			 'sell':sellXR("AED", "MYR"),
			 'link':'https://www.countryflags.io/ae/flat/64.png'},
			 {'name': 'Chinese Yuan',
			 'abbv': 'CNY',
			 'credit': '1.6610',
			 'cash':'1.6610',
			 'buy':buyXR("CNY","MYR"),
			 'sell':sellXR("CNY", "MYR"),
			 'link':'https://www.countryflags.io/cn/flat/64.png'},
			 {'name': 'United States Dollar',
			 'abbv': 'USD',
			 'credit': '0.2333',
			 'cash':'0.2333',
			 'buy':buyXR("USD","MYR"),
			 'sell':sellXR("USD", "MYR"),
			 'link':'https://www.countryflags.io/us/flat/64.png'},
			 {'name': 'Malaysian Ringgit',
			 'abbv': 'MYR',
			 'credit': '1.0000',
			 'cash':'1.0000',
			 'buy':'1.0000',
			 'sell':'1.0000',
			 'link':'https://www.countryflags.io/my/flat/64.png'},
			 {'name': 'Thai Bhat',
			 'abbv': 'THB',
			 'cash': '5,450.8300',
			 'credit': '5,450.8300',
			 'buy':buyXR("THB","MYR"),
			 'sell':sellXR("THB", "MYR"),
			 'link': 'https://www.countryflags.io/th/flat/64.png'},
			 {'name': 'Japanese Yen',
			 'abbv': 'JPY',
			 'cash': '328.5510',
			 'credit': '328.5510',
			 'buy':buyXR("JPY","MYR"),
			 'sell':sellXR("JPY", "MYR"),
			 'link': 'https://www.countryflags.io/jp/flat/64.png'},
			 {'name': 'Phillipines Pesos',
			 'abbv': 'PHP',
			 'cash': '6.9700',
			 'credit': '6.9700',
			 'link': 'https://www.countryflags.io/ph/flat/64.png',
			 'buy':buyXR("PHP","MYR"),
			 'sell':sellXR("PHP", "MYR"),
            }
        ]
        
        $.each(currency_table, function(i, item){
            example = $('#curr-table-wrapper2').clone();
			example.find('#abbv-name').text(item.abbv);
			example.find('#full-name').text(item.name);
			example.find('#buy').text(item.buy);
			example.find('#sell').text(item.sell);
			example.find('#url').attr('src',item.link);
			$('#table2').append(example);
        });
        $('#curr-table-wrapper2').remove();
        $('.exchangeRate').show();
        
        $.each(currency_table, function(i, item){
            example = $('#curr-table-wrapper1').clone();
			example.find('#abbv-name').text(item.abbv);
			example.find('#full-name').text(item.name);
			example.find('#buy').text(item.buy);
			example.find('#sell').text(item.sell);
			example.find('#url').attr('src',item.link);
			$('#table1').append(example);
        });
        $('#curr-table-wrapper1').remove();
    }
);