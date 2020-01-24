
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

export const addSearchIdToList = (id_list, idToAdd) => {
    const existingID = id_list.find(id => id === idToAdd);

    if(!existingID) {
        return[...id_list, idToAdd]
    }
    else{
        return [...id_list]
    }
}

export const flagResults = (search_results_short, search_results_detailed) => {
    
    for(let i = 0; i < search_results_short.length; i++){
        let shortId = search_results_short[i].id;
        let shortObj = search_results_short[i]
        for(let j = 0; j < search_results_detailed.length; j++){
            let detailId = search_results_detailed[j].id;
            let otherShortId = search_results_detailed[j].short_id;
            if(shortId === otherShortId){
                Object.assign(search_results_short[i],
                    {
                        ...shortObj,
                        detail_id: detailId ,
                        detail_flag: true
                    }
                )
            }
        }
    }
    return[...search_results_short]
}