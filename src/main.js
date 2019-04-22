import Vue from 'vue'
import App from './view/Dialog.vue'
import { parseUserListFromNode } from './js/data-parser'
import { closeDialog, isDialogShowing } from './js/helper'

function checkAndUpdate() {
  let selectNode = document.querySelector('#issue_assigned_to_id')
  let newStyle = false
  if (!selectNode) {
    return
  }

  if (selectNode.style.display == 'none') {
    selectNode = selectNode.parentElement.querySelector('.selectize-control.single')
    newStyle = true
  }

  if (!selectNode) {
    return
  }

  if (document.querySelector('#btn-faq-show-dialog')) {
    return
  }

  if (newStyle) {
    let selectWrapperNode = selectNode.querySelector('.selectize-dropdown-content')
    if (selectWrapperNode) {
      parseUserListFromNode(selectWrapperNode, true)
    } else {
      return
    }
  } else {
    parseUserListFromNode(selectNode, false)
  }

  let selectBtn = buildSelectButton()
  if (newStyle) {
    selectBtn.style.verticalAlign = 'top'
    selectNode.appendChild(selectBtn)
  } else {
    selectNode.parentElement.appendChild(selectBtn)
  }
  selectBtn.onclick = function (event) {
    if (!document.querySelector('#faq-root')) {
      showSelectPopup()
      bindView()
    }
    event.preventDefault()
  }
}

function buildSelectButton() {
  let btn = document.createElement('button')
  btn.id = 'btn-faq-show-dialog'
  btn.style.marginLeft = '10px'
  btn.style.position = 'absolute'
  btn.textContent = '选择'
  return btn
}

function showSelectPopup() {
  let container = document.createElement('div')
  container.id = 'faq-root'
  document.body.appendChild(container)
}

function bindView() {
  new Vue({
    render: h => h(App)
  }).$mount('#faq-root')
}

checkAndUpdate()
setInterval(checkAndUpdate, 3000)

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    if (isDialogShowing()) {
      closeDialog()
    }
  }
}, false);
