const stripMiddleName = (name) => {
    const splitName = name.split(" ")
    if (name.split(" ").pop().length === 1) {
         splitName.pop()
         return splitName.join(" ")
    } else return name
}    

const roundToTwoDecimal = (x) => Math.round(x*100)/100

export {
    stripMiddleName,
    roundToTwoDecimal
}