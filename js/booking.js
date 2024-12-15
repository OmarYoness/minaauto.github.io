document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("JTv9fcFAGcibxxt5N");

    const form = document.getElementById('appointmentForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = document.getElementById('submitButton');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Prepare template parameters
            const templateParams = {
                to_name: "Mina Auto",
                from_name: `${this.firstName.value} ${this.lastName.value}`,
                customer_email: this.email.value,
                customer_phone: this.phone.value,
                vehicle_info: `${this.vehicleYear.value} ${this.vehicleMake.value} ${this.vehicleModel.value}`,
                vehicle_mileage: this.vehicleMileage.value,
                service_type: this.serviceType.value,
                appointment_date: this.appointmentDate.value,
                appointment_time: this.appointmentTime.value,
                notes: this.notes.value || 'No additional notes'
            };

            // Send email using EmailJS with your actual service ID and template ID
            emailjs.send('service_jbnwa97', 'template_w3aipac', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('success', 'Appointment request sent successfully! We will contact you shortly to confirm.');
                    form.reset();
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    showMessage('error', 'Failed to send request. Please try again or call us directly.');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Schedule Appointment';
                });
        });
    }
});

function showMessage(type, message) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    const form = document.getElementById('appointmentForm');
    if (form) {
        form.parentNode.insertBefore(messageDiv, form);
        setTimeout(() => messageDiv.remove(), 5000);
    }
} 