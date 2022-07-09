const etiquetaLugar = (a) => {
   
    
    
    let input = String(a.props.id)
    let pieces = input.split(/[\s.]+/)
    input = pieces[pieces.length - 1]
    return String(input)
  
}
export default etiquetaLugar