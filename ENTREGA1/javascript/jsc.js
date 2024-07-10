let total = 0
let bandera = true
totalNotas = 0
promedio = 0
const Alumnos = [];
const Nota = [];

function Promediar() {
    promedio = totalNotas / Alumnos.length

    alert("Se ingresaron: " + Alumnos.length + " Alumnos y el promedio de notas es de: " + promedio.toFixed(2))
}

while (bandera) {
    let Docente = confirm("Ingrese los datos del alumno")

    if (Docente) {
        let agregarAlumno = prompt("Ingrese el nombre del Alumno")
        let agregarNota = parseInt(prompt("Ingrese la nota del alumno"))

        Alumnos.push(agregarAlumno)
        Nota.push(agregarNota)
        totalNotas += agregarNota
        alert("Los alumnos ingresados son :\n" + Alumnos.join("\n"))

    } else {

        Promediar()
        bandera = false

        alert ("Gracias por utilizar nuestra pagina!")

        console.log (Alumnos)
        console.log (Nota)

    }

}
