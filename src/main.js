import Vue from 'vue'
import App from './view/Dialog.vue'

const APP_ID_NOHASH = "faq-root"
const APP_ID = "#" + APP_ID_NOHASH

function checkAndUpdate() {
  let selectNode = document.querySelector("#issue_assigned_to_id")
  if (!selectNode) {
    return
  }

  let selectBtn = buildSelectButton()
  selectNode.parentElement.appendChild(selectBtn)
  selectBtn.onclick = function (event) {
    if (!document.querySelector(APP_ID)) {
      showSelectPopup()
      bindView()
    }
    event.preventDefault()
  }
}

function buildSelectButton() {
  let btn = document.createElement('button')
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
    render: h => h(App),
  }).$mount(APP_ID)
}

checkAndUpdate()
setInterval(checkAndUpdate, 3000)