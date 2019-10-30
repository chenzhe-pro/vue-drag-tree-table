/**
 * Created by chenzhe on 2019/5/14.
 */
class CustomFormData {
  constructor () {
    this.bodyFormData = new FormData()
  }

  appendJson (name, json) {
    let jsonStr = JSON.stringify(json)
    let blob = new Blob([jsonStr], {
      type: 'application/json'
    })
    this.bodyFormData.append(name, blob)
  }

  appendFile (name, file) {
    this.bodyFormData.append(name, file)
  }

  getFormData () {
    return this.bodyFormData
  }
}

export default CustomFormData
