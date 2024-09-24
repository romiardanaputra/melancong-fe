import Swal from 'sweetalert2'

export const handleSaveAlert = (success = false) => {
  if (success) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your profile has been saved successfully.',
      showConfirmButton: false,
      timer: 1500
    })
  } else {
    Swal.fire({
      title: 'Saving...',
      html: 'Please wait while we save your changes.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: () => {
        Swal.hideLoading()
      }
    })
  }
}

export const handleErrorAlert = () => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Failed to update profile',
    confirmButtonColor: '#00838F'
  })
}
