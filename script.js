function asignarDiasPreferidos() {
    // Preferencias de días: asignamos en días alternos para no sobrecargar un día
    // Ejemplo: lunes y miércoles, martes y jueves
    const diasPreferidos = {
      1: [1, 3], // Lunes y miércoles
      2: [2, 4], // Martes y jueves
      3: [1, 3], // Lunes y miércoles
      4: [2, 4], // Martes y jueves
      5: [1, 4], // Lunes y jueves (Menos carga los viernes)
    };
  
    return diasPreferidos;
  }
  
  // Función actualizada para respetar días preferidos
  function crearHorarioPersonalizado(maestros, asignaturas, grupos) {
    let horario = [];
    const diasPreferidos = asignarDiasPreferidos(); // Cargamos los días preferidos
  
    maestros.forEach(maestro => {
      let horasAsignadas = 0;
  
      // Asignamos las clases respetando disponibilidad y días preferidos
      asignaturas.forEach(asignatura => {
        if (horasAsignadas < 4) { // Un maestro puede dar hasta 4 asignaturas
  
          grupos.forEach(grupo => {
            let horasTotales = asignatura.horasPorSemana;
            let horasPorDia = Math.ceil(horasTotales / 2); // Dividimos en dos días
            let diasAsignados = 0;
            let diasOpciones = diasPreferidos[grupo.id]; // Usamos días preferidos según el grupo
  
            // Asignamos las clases en días no consecutivos
            diasOpciones.forEach(dia => {
              if (diasAsignados < 2 && !verificarSolapamiento(horario, maestro, dia, horasPorDia)) {
                horario.push({
                  maestro: maestro.nombre,
                  asignatura: asignatura.nombre,
                  grupo: grupo.nombre,
                  dia: `Día ${dia}`,
                  horas: horasPorDia > horasTotales ? horasTotales : horasPorDia
                });
                horasTotales -= horasPorDia;
                diasAsignados++;
              }
            });
  
            horasAsignadas++;
          });
        }
      });
    });
  // script.js
  
  // Capturar el formulario y la tabla
  const formulario = document.getElementById("formulario-horario");
  const tableBody = document.getElementById("horario-table");
  
  // Añadir evento de envío del formulario
  formulario.addEventListener("submit", function(event) {
      event.preventDefault(); // Evitar que se recargue la página
  
      // Capturar los valores del formulario
      const materia = document.getElementById("materia").value;
      const maestro = document.getElementById("maestro").value;
      const lunes = document.getElementById("lunes").value || ""; // Campo vacío si no se ingresa nada
      const martes = document.getElementById("martes").value || "";
      const miercoles = document.getElementById("miercoles").value || "";
      const jueves = document.getElementById("jueves").value || "";
      const viernes = document.getElementById("viernes").value || "";
  
      // Crear una nueva fila en la tabla
      const row = document.createElement("tr");
  
      // Añadir las celdas con la información capturada
      row.innerHTML = `
          <td>${materia}</td>
          <td>${lunes}</td>
          <td>${martes}</td>
          <td>${miercoles}</td>
          <td>${jueves}</td>
          <td>${viernes}</td>
          <td>${maestro}</td>
      `;
  
      // Agregar la nueva fila a la tabla
      tableBody.appendChild(row);
  
      // Limpiar los campos del formulario
      formulario.reset();
  });
  
    return horario;
  }
