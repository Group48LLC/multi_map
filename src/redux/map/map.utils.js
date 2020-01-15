
// TODO: check for duplicate terms
export const addTermToTerms = (terms, termToAdd) => {
    terms.push(termToAdd);
    console.log('term to add= ' + termToAdd + ', terms = ' + terms);
    return terms

};

export const addSearchToResults = (searchResults, resultToAdd) => {
    const existingSearchResult = searchResults.find(searchResult => searchResult.id === resultToAdd.id);

    if(!existingSearchResult) {
        return[...searchResults, resultToAdd]
    }
    else{
        return [...searchResults]
    }
}