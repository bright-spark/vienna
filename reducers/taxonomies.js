import { forEach } from 'lodash'

export default function types( state = {}, action ) {
	switch ( action.type ) {
		case 'TAXONOMIES_UPDATED':
			forEach( action.data, taxonomy => {
				taxonomy.terms = {}
				taxonomy.list = {
					filter: { status: 'all' },
					isShowingFilter: false,
					loading: false,
				}
			} )
			return action.data
		case 'TAXONOMY_TERMS_UPDATING':
			state[ action.payload.taxonomy ].list.loading = true
			return {...state}
		case 'TAXONOMY_TERMS_UPDATED':
			forEach( action.payload.terms, term => {
				state[ action.payload.taxonomy ].terms[ term.id ] = term
				state[ action.payload.taxonomy ].list.loading = false
			})
			return {...state}
	}
	return state
}
