const notesList = document.querySelector("#notes");

let savedId = "";

const noteUI = (note) => {

  let description = (note.description);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body animate__animated animate__fadeInUp mb-2 bg-dark">
      <div class="d-flex justify-content-between ">
          <strong >${note.title}: ${note.time}</strong>
          <div>
              <button class="btn btn-danger delete" data-id="${note.id}">borrar</button>
              <button class="btn btn-primary update" data-id="${note.id}">actualizar</button>
          </div>
      </div>
      <textarea disabled class="bg-dark" style="resize: none; border:none">${description}</textarea>
  </div>`
;
  const btnDelete = div.querySelector(".delete");
  const btnUpdate = div.querySelector(".update");

  btnDelete.addEventListener("click", () => {
    swal({
      title: "¿Está seguro?",
      text: "Está a punto de eliminar el mensaje de "+note.title,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        deleteNote(btnDelete.dataset.id)
        swal("El mensaje se borró correctamente!", {
          icon: "success",
        });
      } else {
        swal("La acción fue cancelada exitosamente!");
      }
    });

  });
        
  btnUpdate.addEventListener("click", () => {
    socket.emit("client:getnote", btnUpdate.dataset.id);
  });

  return div;
};

const renderNotes = (notes) => {
  savedId = "";
  notesList.innerHTML = "";
  console.log(notes);
  notes.forEach((note) => {
    notesList.append(noteUI(note));
  });
};

const appendNote = (note) => {
  notesList.append(noteUI(note));
};