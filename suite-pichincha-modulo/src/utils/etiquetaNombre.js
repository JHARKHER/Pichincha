
const etiquetaNombre = (b,a) => {
   
    let input = String(a)
    let pieces = input.split(/[\s.]+/)
    input = b + "-" + pieces[pieces.length - 1]
    return String(input)
}
export default etiquetaNombre