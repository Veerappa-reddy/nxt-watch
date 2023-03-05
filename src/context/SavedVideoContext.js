import React from 'react'

const SavedVideoContext = React.createContext({
  savedVideosList: [],
  addToSavedVideos: () => {},
  lightTheme: true,
  clickTheme: () => {},
  menuId: 1,
  clickedMenuOption: () => {},
  menuOptionLink: '/',
})

export default SavedVideoContext
