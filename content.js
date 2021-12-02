var banking_words = ['Investment management', 'Loan', 'Mortgage', 'Financial services', 'Mortgage calculator', 'Investment', 'Financial service company', 'Mortgage rate', 'Quicken loans', 'Life insurance', 'Mortgage payment calculator', 'Payday loans', 'Investment planning', 'Personal loan', 'Finance', 'Investment plan', 'Retirement accounts', 'Finance calculator', 'Credit Score', 'Return on investment', 'Investment banker', 'Google finance', 'Nerd wallet', 'ROI', 'Investment banking', 'Investment planning', 'Financial independence', 'Student loans', 'Foreign Investment', 'Foreign direct investment', 'Yahoo finance', 'Financial advisor', 'Mutual funds', 'Toyota financials', 'Insurance', 'FPA', 'Wealth management', 'Financial institutions', 'Investing', 'Refinance', 'E-finance', 'Google finance world', 'Stock quotes', 'Ministry of finance', 'Finance yahoo com', 'Google shares', 'Shares', 'Stock exchange', 'Finanzen.', 'Invest', 'Buy', 'Sell', 'Purchase', 'Wall street', 'Finance sector', 'Budget', 'Minister of finance', 'Treasury', 'Bonds']
var ecommerce_words = ['Trending', 'Best Sellers', 'New Releases', 'Shop By Department', 'MobilesÂ', 'Computers', 'TVÂ', 'AppliancesÂ', 'Electronics', "Men's Fashion", "Women's Fashion", '"Home, Kitchen, Pets"', '"Beauty, Health, Grocery"', '"Sports, Fitness, Bags, Luggage"', '"Toys, Baby Products, Kids\' Fashion"', 'Car', 'MotorbikeÂ', 'Industrial', 'Books', 'Movies', 'Music', 'Video Games', 'Mobiles', 'Best Sellers', 'Electronics', 'Fashion', 'Customer Service', 'Prime', 'Home & Kitchen', 'Amazon Pay', 'Deals of the Day', 'Cart']
var booking_words = ['hotels', 'flights', 'train', 'ticket', 'bus', 'travelocity', 'airline tickets', 'vacation', 'trip', 'plane tickets', 'travel agency', 'airlines', 'cheap airline tickets', 'airfare', 'fare', 'cheap airfare', 'destination', 'one travel', 'package', 'vacation packages', 'cheap plane tickets', 'travel channel', 'cheap airlines', 'travel news', 'budget travel', 'last minute travel', 'travel sites', 'cheap flights', 'cheap tickets', 'airline tickets', 'china airlines', 'air ticket', 'travel agency', 'cheap airline tickets', 'cheap air tickets', 'cheap air', 'cheap airfare', 'cheap o air', 'cheap plane tickets', 'airplane ticket', 'travel sites', 'airline flights', 'travel websites', 'travel deals', 'places to visit', 'beach holidays', 'travel packages', 'best flight deals', 'travel agencies', 'best at travel', 'places to go']
cnts = [0,0,0]
var categories = [banking_words, ecommerce_words, booking_words]
found=false
word = ""

cnt = 0;


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.msg == "fetchWords"){
        cnt = 0;
        for(i=0; i<categories.length; i++){
            for(j=0; j<categories[i].length; j++){
                if(document.body.innerText.indexOf(categories[i][j]) > -1){
                    found = true;
                    cnt += 1;
                }
                // if(window.find(categories[i][j], false, false, false, true, false, false)){
                //     found = true;
                //     cnt += 1;
                //     // break;
                // }
            }
            // if(found){
            //     break;
            // }
        }
        if(found && cnt > 5){
            var answer = window.confirm("This website may contain collect some sensitive information. Open it in incognito mode to avoid the data being stored in the form of cookies!")
            let message = {msg:"none"};
            if(answer){
                message.msg = "incog";
            }
            else{
                message.msg = "noincog";
            }
            // alert(String(cnt));
            chrome.runtime.sendMessage(message);

        }
        

    }
});
