// ==UserScript==
// @name         MyAnimelist mod
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Ilmari
// @match        http://myanimelist.net/animelist/Limpparipoju*
// @match        http://myanimelist.net/mangalist/Limpparipoju*
// @grant        none
// ==/UserScript==
'use strict';

function largerImages() {
  let images = document.querySelectorAll('img.hover-info.image')
  
  for (let i = 0; i < images.length; i++) {
    let img = images[i]
    img.src = img.src.replace('/r/96x136/', '/')
  }
}

function removeMoreButton() {
  let elems = document.querySelectorAll('.add-edit-more')
  
  for (let i = 0; i < elems.length; i++) {
    let elem = elems[i]
    elem.removeChild(elem.querySelector('.more'))
    for (let i = 0; i < elem.childNodes.length; i++) {
      let node = elem.childNodes[i]
      if (elem.childNodes[i].nodeName === '#text') {
        elem.removeChild(node)
      }
    }
  }
}

function removeTableHeader() {
  document.querySelector('.list-table > tbody:not(.list-item)').remove()
}

function addStatusSeparators() {
  let table = document.querySelector('.list-table')
  let separators = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch']
  
  separators.forEach(name => {
    let separator = createSeparator(name)
    let firstItem = table.querySelector('.data.status.' + name.replace(/\s/g, '').toLowerCase())
    if (firstItem) {
      table.insertBefore(separator, firstItem.parentNode.parentNode)
    }
  })
}

function createSeparator(name) {
  let separator = document.createElement('tbody')
  let h2 = document.createElement('h2')
  let content = document.createTextNode(name)
  h2.appendChild(content)
  separator.appendChild(h2)
  separator.className = 'separator'
  
  return separator
}


setTimeout(() => {
  largerImages()
  removeTableHeader()
  addStatusSeparators()
  removeMoreButton()
}, 0)
