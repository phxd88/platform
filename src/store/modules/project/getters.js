import _ from 'lodash'

export default {
  getIfcElements: state => idIfc => {
    return state.elements.find(element => {
      return parseInt(idIfc) === element.ifc
    })
  },
  getSortedIfc: (state) => {
    return _.sortBy(state.ifcs, ['updated_at']).reverse()
  },
  getMainIfc: (state) => {
    if (state.ifcs === null) {
      return null
    }

    let completedIfc = state.ifcs.filter(ifc => ifc.status === 'C')
    return _.sortBy(completedIfc, ['created_at'])[0]
  },
  getCurrentChildren: state => {
    return (state.currentElement !== null) ? state.currentElement.children : null
  },

  folders: state => {
    const foldersFromTree = (link, tree) => {
      const folders = [ ...link, ...tree.filter(item => item.type === 'Folder') ]

      return folders.map(
        folder => folder.children
          ? foldersFromTree(folders, folder.children)
          : folder
      )
    }

    return state.tree ? foldersFromTree([], state.tree.children) : null
  }
}
