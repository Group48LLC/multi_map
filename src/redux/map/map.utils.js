
// TODO: check for duplicate terms
export const addTermToTerms = (terms, termToAdd) => {
    terms.push(termToAdd);
    console.log('term to add= ' + termToAdd + ', terms = ' + terms);
    return terms

};