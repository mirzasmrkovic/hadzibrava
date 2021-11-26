'use strict'

// Read
const getOne = model => async query => {
  try {
    const doc = await model.findOne(query).lean().exec()
    return doc
  } catch (error) {
    console.error(error)
    return error
  }
}
module.exports.getOne = getOne

const getAll = model => async () => {
  try {
    const docs = await model.find().lean().exec()
    return docs
  } catch (error) {
    console.error(error)
    return error
  }
}
module.exports.getAll = getAll

// Create
const createOne = model => async body => {
  try {
    const docs = await model.create(body)
    return docs
  } catch (error) {
    console.error(error)
    return error
  }
}
module.exports.createOne = createOne

// Update
const updateByID = model => async request => {
  try {
    const updatedDocs = await model
      .findByIdAndUpdate(
        request.id,

        request.body,
        { new: true }
      )
      .exec()

    return updatedDocs
  } catch (error) {
    console.error(error)
    return error
  }
}
module.exports.updateByID = updateByID

// Delete
const removeOne = model => async request => {
  try {
    const removedDocs = await model
      .findOneAndRemove({
        _id: request.id,
      })
      .exec()

    return removedDocs
  } catch (error) {
    console.error(error)
    return error
  }
}
module.exports.removeOne = removeOne

module.exports.crud = model => ({
  getOne: getOne(model),
  getAll: getAll(model),
  createOne: createOne(model),
  updateByID: updateByID(model),
  removeOne: removeOne(model),
})
