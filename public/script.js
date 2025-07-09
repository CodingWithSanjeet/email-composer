// DOM elements
const emailForm = document.getElementById('emailForm');
const clearButton = document.getElementById('clearForm');
const submitButton = emailForm.querySelector('button[type="submit"]');
const notification = document.getElementById('notification');

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.to || !formData.to.trim()) {
        errors.push('Recipient email is required');
    } else if (!isValidEmail(formData.to)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.subject || !formData.subject.trim()) {
        errors.push('Subject is required');
    }
    
    if (!formData.message || !formData.message.trim()) {
        errors.push('Message is required');
    }
    
    return errors;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'success') {
    const icon = notification.querySelector('.notification-icon');
    const messageElement = notification.querySelector('.notification-message');
    
    notification.className = `notification ${type}`;
    messageElement.textContent = message;
    
    if (type === 'success') {
        icon.className = 'fas fa-check-circle notification-icon';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle notification-icon';
    }
    
    notification.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
}

// Set loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Email';
    }
}

// Handle form submission
emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(emailForm);
    const emailData = {
        to: formData.get('to'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    const errors = validateForm(emailData);
    if (errors.length > 0) {
        showNotification(errors.join(', '), 'error');
        return;
    }
    
    setLoadingState(true);
    
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showNotification('Email sent successfully! 🎉', 'success');
            emailForm.reset();
        } else {
            showNotification(result.message || 'Failed to send email', 'error');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        showNotification('Network error. Please try again.', 'error');
    } finally {
        setLoadingState(false);
    }
});

// Clear form
clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the form?')) {
        emailForm.reset();
        showNotification('Form cleared', 'success');
    }
});

// Auto-resize textarea
const textarea = document.getElementById('message');
textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
});

// Form animations
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to send
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        emailForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape to close notification
    if (e.key === 'Escape') {
        notification.classList.add('hidden');
    }
});

// Character count for subject and message
function addCharacterCount(element, maxLength = null) {
    const parent = element.parentElement;
    const counter = document.createElement('div');
    counter.className = 'character-count';
    counter.style.cssText = `
        font-size: 0.85rem;
        color: #64748b;
        text-align: right;
        margin-top: 5px;
    `;
    
    function updateCount() {
        const length = element.value.length;
        counter.textContent = maxLength ? `${length}/${maxLength}` : `${length} characters`;
        
        if (maxLength && length > maxLength) {
            counter.style.color = '#f56565';
        } else {
            counter.style.color = '#64748b';
        }
    }
    
    element.addEventListener('input', updateCount);
    parent.appendChild(counter);
    updateCount();
}

// Add character counters
addCharacterCount(document.getElementById('subject'), 100);
addCharacterCount(document.getElementById('message'));

// Smooth scroll to form on page load
window.addEventListener('load', () => {
    const form = document.querySelector('.email-form-container');
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Email template suggestions
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const templates = {
    'meeting': {
        subject: 'Meeting Request',
        message: 'Hi,\n\nI would like to schedule a meeting with you to discuss...\n\nBest regards,'
    },
    'follow-up': {
        subject: 'Follow-up',
        message: 'Hi,\n\nI wanted to follow up on our previous conversation about...\n\nLooking forward to hearing from you.\n\nBest regards,'
    },
    'introduction': {
        subject: 'Introduction',
        message: 'Hi,\n\nI hope this email finds you well. I wanted to introduce myself...\n\nBest regards,'
    }
};

// Add template selector (optional enhancement)
function createTemplateSelector() {
    const container = document.querySelector('.email-form');
    const templateDiv = document.createElement('div');
    templateDiv.className = 'template-selector';
    templateDiv.innerHTML = `
        <label>
            <i class="fas fa-magic"></i>
            Quick Templates
        </label>
        <select id="templateSelect">
            <option value="">Select a template...</option>
            <option value="meeting">Meeting Request</option>
            <option value="follow-up">Follow-up</option>
            <option value="introduction">Introduction</option>
        </select>
    `;
    
    const select = templateDiv.querySelector('select');
    select.style.cssText = `
        padding: 10px 15px;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        font-size: 0.9rem;
        background: #f8fafc;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    select.addEventListener('change', (e) => {
        const template = templates[e.target.value];
        if (template) {
            subjectInput.value = template.subject;
            messageInput.value = template.message;
            e.target.value = '';
        }
    });
    
    container.insertBefore(templateDiv, container.firstChild);
}

// Initialize template selector
createTemplateSelector();

// Add some nice effects
function addRippleEffect(button) {
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(addRippleEffect);

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .template-selector {
        margin-bottom: 20px;
    }
    
    .template-selector label {
        font-weight: 600;
        color: #4a5568;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.95rem;
        margin-bottom: 8px;
    }
    
    .template-selector label i {
        color: #667eea;
        width: 16px;
    }
    
    .focused {
        transform: translateY(-2px);
        transition: transform 0.2s ease;
    }
    
    .character-count {
        transition: color 0.2s ease;
    }
`;
document.head.appendChild(style);

console.log('🎉 Email Composer initialized successfully!'); 