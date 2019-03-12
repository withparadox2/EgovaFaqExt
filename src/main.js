import Vue from 'vue'
import App from './view/Dialog.vue'
import { parseUserListFromNode } from './js/data-parser'
import { closeDialog, isDialogShowing } from './js/helper'

function checkAndUpdate() {
  let selectNode = document.querySelector('#issue_assigned_to_id')
  if (!selectNode) {
    return
  }

  if (document.querySelector('#btn-faq-show-dialog')) {
    return
  }

  parseUserListFromNode(selectNode)

  let selectBtn = buildSelectButton()
  selectNode.parentElement.appendChild(selectBtn)
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
