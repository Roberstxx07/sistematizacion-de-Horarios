// Lista para almacenar los maestros
const maestros = [];

// Función para asignar días preferidos (ejemplo)
function asignarDiasPreferidos() {
  return {
    1: [1, 3], // Lunes y miércoles
    2: [2, 4], // Martes y jueves
    3: [1, 3], // Lunes y miércoles
    4: [2, 4], // Martes y jueves
    5: [1, 4], // Lunes y jueves
  };
}

// Función para verificar si hay solapamiento de horarios
function verificarSolapamiento(horario, maestro, dia, horasPorDia) {
  return horario.some(h => h.maestro === maestro && h.dia === dia && h.horas === horasPorDia);
}

// Función para crear el horario personalizado
function crearHorarioPersonalizado(maestros, asignaturas, grupos) {
  let horario = [];
  const diasPreferidos = asignarDiasPreferidos();

  maestros.forEach(maestro => {
    let horasAsignadas = 0;

    asignaturas.forEach(asignatura => {
      if (horasAsignadas < 4) {
        grupos.forEach(grupo => {
          let horasTotales = asignatura.horasPorSemana;
          let horasPorDia = Math.ceil(horasTotales / 2); // Dividimos en dos días
          let diasAsignados = 0;
          let diasOpciones = diasPreferidos[grupo.id]; // Usamos días preferidos según el grupo

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

  return horario;
}

// Función para capturar los datos del formulario y añadir un maestro
function agregarMaestro() {
  const nombre = document.getElementById('nombre').value;
  const tipo = document.getElementById('tipo').value;
  const asignatura = document.getElementById('asignatura').value;
  const dia1 = document.getElementById('dia1').value;
  const horario1 = document.getElementById('horario1').value;
  const dia2 = document.getElementById('dia2').value;
  const horario2 = document.getElementById('horario2').value;

  // Validar que los días no se solapen y los campos estén completos
  if (nombre && asignatura && horario1 && horario2 && dia1 !== dia2) {
    maestros.push({ nombre, tipo, asignatura, dia1, horario1, dia2, horario2 });

    // Limpiar el formulario después de agregar el maestro
    document.getElementById('nombre').value = '';
    document.getElementById('asignatura').value = '';
    document.getElementById('horario1').value = '';
    document.getElementById('horario2').value = '';
    document.getElementById('dia1').selectedIndex = 0;
    document.getElementById('dia2').selectedIndex = 0;

    alert('Maestro agregado exitosamente');
  } else {
    alert('Por favor, completa todos los campos correctamente y asegúrate de que los días no sean iguales');
  }
}

// Función para generar el horario y rellenar la tabla
function generarHorario() {
  const tabla = document.getElementById('horario-table');
  tabla.innerHTML = ''; // Limpiamos la tabla antes de llenarla

  maestros.forEach(maestro => {
    let fila = document.createElement('tr');

    let tdNombre = document.createElement('td');
    tdNombre.textContent = maestro.nombre;

    let tdTipo = document.createElement('td');
    tdTipo.textContent = maestro.tipo.replace('_', ' ').toUpperCase();

    let tdAsignatura = document.createElement('td');
    tdAsignatura.textContent = maestro.asignatura;

    let tdDia1 = document.createElement('td');
    tdDia1.textContent = maestro.dia1;

    let tdHorario1 = document.createElement('td');
    tdHorario1.textContent = maestro.horario1;

    let tdDia2 = document.createElement('td');
    tdDia2.textContent = maestro.dia2;

    let tdHorario2 = document.createElement('td');
    tdHorario2.textContent = maestro.horario2;

    fila.appendChild(tdNombre);
    fila.appendChild(tdTipo);
    fila.appendChild(tdAsignatura);
    fila.appendChild(tdDia1);
    fila.appendChild(tdHorario1);
    fila.appendChild(tdDia2);
    fila.appendChild(tdHorario2);

    tabla.appendChild(fila);
  });

  if (maestros.length === 0) {
    alert('No hay maestros agregados');
  }
}
// Lista para almacenar los maestros
const maestros = [];

// Función para asignar días preferidos (ejemplo)
function asignarDiasPreferidos() {
  return {
    1: [1, 3], // Lunes y miércoles
    2: [2, 4], // Martes y jueves
    3: [1, 3], // Lunes y miércoles
    4: [2, 4], // Martes y jueves
    5: [1, 4], // Lunes y jueves
  };
}

// Función para verificar si hay solapamiento de horarios
function verificarSolapamiento(horario, maestro, grupo, dia, horasPorDia) {
  return horario.some(h => h.maestro === maestro && h.grupo === grupo && h.dia === dia && h.horas === horasPorDia);
}

// Función para validar si el horario está dentro del permitido según el tipo de maestro
function esHorarioValido(tipo, horario) {
  const [horaInicio, horaFin] = horario.split('-').map(hora => parseInt(hora, 10));
  if (tipo === 'tiempo_completo') {
    return horaInicio >= 7 && horaFin <= 15;
  } else if (tipo === 'contrato') {
    return horaInicio >= 7 && horaFin <= 21;
  }
  return false;
}

// Función para crear el horario personalizado
function crearHorarioPersonalizado(maestros, asignaturas, grupos) {
  let horario = [];
  const diasPreferidos = asignarDiasPreferidos();

  maestros.forEach(maestro => {
    let horasAsignadas = 0;

    asignaturas.forEach(asignatura => {
      if (horasAsignadas < 4) {
        grupos.forEach(grupo => {
          let horasTotales = asignatura.horasPorSemana;
          let horasPorDia = Math.ceil(horasTotales / 2); // Dividimos en dos días
          let diasAsignados = 0;
          let diasOpciones = diasPreferidos[grupo.id]; // Usamos días preferidos según el grupo

          diasOpciones.forEach(dia => {
            if (diasAsignados < 2 && !verificarSolapamiento(horario, maestro, grupo, dia, horasPorDia)) {
              // Validar que las horas asignadas están dentro del horario permitido según el tipo de maestro
              if (esHorarioValido(maestro.tipo, maestro.horario1) && esHorarioValido(maestro.tipo, maestro.horario2)) {
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
            }
          });

          horasAsignadas++;
        });
      }
    });
  });

  return horario;
}

// Función para validar el formato de horarios
function validarHorario(horario) {
  const regex = /^([1-9]|1[0-2])-(\d+)(am|pm)$/;
  return regex.test(horario);
}

// Función para capturar los datos del formulario y añadir un maestro
function agregarMaestro() {
  const nombre = document.getElementById('nombre').value;
  const tipo = document.getElementById('tipo').value;
  const asignatura = document.getElementById('asignatura').value;
  const dia1 = document.getElementById('dia1').value;
  const horario1 = document.getElementById('horario1').value;
  const dia2 = document.getElementById('dia2').value;
  const horario2 = document.getElementById('horario2').value;

  // Validar que los días no se solapen, los campos estén completos y los horarios sean válidos
  if (nombre && asignatura && validarHorario(horario1) && validarHorario(horario2) && dia1 !== dia2) {
    maestros.push({ nombre, tipo, asignatura, dia1, horario1, dia2, horario2 });

    // Limpiar el formulario después de agregar el maestro
    document.getElementById('nombre').value = '';
    document.getElementById('asignatura').value = '';
    document.getElementById('horario1').value = '';
    document.getElementById('horario2').value = '';
    document.getElementById('dia1').selectedIndex = 0;
    document.getElementById('dia2').selectedIndex = 0;

    alert('Maestro agregado exitosamente');
  } else {
    alert('Por favor, completa todos los campos correctamente, asegúrate de que los días no sean iguales y los horarios estén en el formato correcto.');
  }
}

// Función para generar el horario y rellenar la tabla
function generarHorario() {
  const tabla = document.getElementById('horario-table');
  tabla.innerHTML = ''; // Limpiamos la tabla antes de llenarla

  maestros.forEach((maestro, index) => {
    let fila = document.createElement('tr');

    let tdNombre = document.createElement('td');
    tdNombre.textContent = maestro.nombre;

    let tdTipo = document.createElement('td');
    tdTipo.textContent = maestro.tipo.replace('_', ' ').toUpperCase();

    let tdAsignatura = document.createElement('td');
    tdAsignatura.textContent = maestro.asignatura;

    let tdDia1 = document.createElement('td');
    tdDia1.textContent = maestro.dia1;

    let tdHorario1 = document.createElement('td');
    tdHorario1.textContent = maestro.horario1;

    let tdDia2 = document.createElement('td');
    tdDia2.textContent = maestro.dia2;

    let tdHorario2 = document.createElement('td');
    tdHorario2.textContent = maestro.horario2;

    // Botón para eliminar
    let tdEliminar = document.createElement('td');
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = () => eliminarMaestro(index);
    tdEliminar.appendChild(botonEliminar);

    fila.appendChild(tdNombre);
    fila.appendChild(tdTipo);
    fila.appendChild(tdAsignatura);
    fila.appendChild(tdDia1);
    fila.appendChild(tdHorario1);
    fila.appendChild(tdDia2);
    fila.appendChild(tdHorario2);
    fila.appendChild(tdEliminar);

    tabla.appendChild(fila);
  });

  if (maestros.length === 0) {
    alert('No hay maestros agregados');
  }
}

// Función para eliminar un maestro de la lista
function eliminarMaestro(index) {
  maestros.splice(index, 1); // Elimina el maestro de la lista
  generarHorario(); // Vuelve a generar la tabla con los datos actualizados
}

