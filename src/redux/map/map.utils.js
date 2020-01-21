
// TODO: check for duplicate terms
export const addTermToTerms = (terms, termToAdd) => {
    terms.push(termToAdd);
    console.log('term to add= ' + termToAdd + ', terms = ' + terms);
    return terms

};

export const addSearchToResults = (searchResults, resultToAdd) => {
    
    const existingSearchResult = searchResults.find(searchResult => searchResult.id === resultToAdd.id);

    if(!existingSearchResult) {
        let priceToAdd = '';
        if(resultToAdd.price_level > 0){
            
            for(let i = 0; i <= resultToAdd.price_level; i++){
                
                priceToAdd+='$';
                console.log(priceToAdd)
            }
            //Object.assign(resultToAdd.price_level, priceToAdd);
            
            resultToAdd.price_level = null;
            resultToAdd.price_level = priceToAdd;
        }
        priceToAdd = null;
        return[...searchResults, resultToAdd]
    }
    else{
        return [...searchResults]
    }
}

export const addToSearchResultsDetailed = (searchResults, resultToAdd) => {
    
    const existingSearchResult = searchResults.find(searchResult => searchResult.id === resultToAdd.id);

    if(!existingSearchResult) {
        return[...searchResults, resultToAdd]
    }
    else{
        return [...searchResults]
    }
}