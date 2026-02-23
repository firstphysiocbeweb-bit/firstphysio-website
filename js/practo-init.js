/* ================================
   First Physio - Practo Widget Initialization
   ================================ */

(function() {
    'use strict';

    // Practo Widget Configuration
    const PRACTO_CONFIG = {
        widgetId: '8f949f5b40674f28',
        profileUrl: 'https://www.practo.com/coimbatore/doctor/augustine-joseph-physiotherapist',
        maxRetries: 5,
        retryDelay: 500 // milliseconds
    };

    // Track initialization state
    let practoInitialized = false;
    let practoInitAttempts = 0;

    // Utility function to log messages (console + error tracking)
    function logPracto(message, type = 'log') {
        const timestamp = new Date().toLocaleTimeString();
        const prefix = `[${timestamp}] Practo:`;
        
        console.log(`${prefix} ${message}`);
        
        // Optional: Send to server for debugging if needed
        // Could implement error tracking here
    }

    // Check if Practo library is available
    function isPractoAvailable() {
        return window.PractoWidget !== undefined || 
               window.practo !== undefined ||
               document.querySelector('practo\\:abs_widget') !== null;
    }

    // Wait for Practo library to load
    function waitForPracto() {
        return new Promise((resolve) => {
            if (isPractoAvailable()) {
                logPracto('Practo library already loaded');
                resolve(true);
                return;
            }

            practoInitAttempts = 0;

            const checkPracto = setInterval(() => {
                practoInitAttempts++;
                
                if (isPractoAvailable()) {
                    logPracto('Practo library loaded successfully');
                    clearInterval(checkPracto);
                    resolve(true);
                    return;
                }

                if (practoInitAttempts >= PRACTO_CONFIG.maxRetries) {
                    logPracto(`Warning: Practo library not loaded after ${PRACTO_CONFIG.maxRetries} attempts`,'warn');
                    clearInterval(checkPracto);
                    resolve(false);
                }
            }, PRACTO_CONFIG.retryDelay);

            // Timeout safety net
            setTimeout(() => {
                clearInterval(checkPracto);
            }, PRACTO_CONFIG.maxRetries * PRACTO_CONFIG.retryDelay + 1000);
        });
    }

    // Initialize Practo widget properly
    async function initializePractoWidget() {
        if (practoInitialized) {
            logPracto('Practo widget already initialized');
            return true;
        }

        try {
            logPracto('Waiting for Practo library...');
            const loaded = await waitForPracto();

            if (!loaded) {
                logPracto('Practo library not available - using fallback', 'warn');
                setupFallbackBooking();
                return false;
            }

            // Try to initialize the widget
            if (window.PractoWidget && typeof window.PractoWidget.init === 'function') {
                logPracto('Initializing Practo widget with ID: ' + PRACTO_CONFIG.widgetId);
                window.PractoWidget.init({
                    widgetId: PRACTO_CONFIG.widgetId,
                    onBookingComplete: handleBookingSuccess,
                    onBookingError: handleBookingError,
                    onOTPSent: handleOTPSent,
                    onOTPVerified: handleOTPVerified
                });
                practoInitialized = true;
                logPracto('Practo widget initialized successfully');
                return true;
            }

            // Fallback: The widget auto-initializes through script tag
            logPracto('Practo widget should auto-initialize through script tag');
            practoInitialized = true;
            return true;

        } catch (error) {
            logPracto('Error initializing Practo widget: ' + error.message, 'error');
            setupFallbackBooking();
            return false;
        }
    }

    // Handle successful booking
    function handleBookingSuccess(bookingData) {
        logPracto('Booking completed successfully!');
        console.log('Booking details:', bookingData);
        
        // Show user feedback
        showNotification('Appointment booked successfully! Check your email for confirmation.', 'success');
        
        // Optionally track the conversion
        if (window.gtag) {
            gtag('event', 'appointment_booked', {
                'event_category': 'engagement',
                'event_label': 'Practo Widget'
            });
        }
    }

    // Handle booking errors
    function handleBookingError(error) {
        logPracto('Booking error: ' + error.message, 'error');
        console.log('Error details:', error);
        
        // Show user feedback
        showNotification('Booking failed. Please try again or call us directly.', 'error');
    }

    // Handle OTP sent
    function handleOTPSent(data) {
        logPracto('OTP sent to: ' + (data?.phoneNumber ? data.phoneNumber.replace(/\d(?=\d{4})/g, '*') : 'user'));
        console.log('OTP data:', data);
    }

    // Handle OTP verified
    function handleOTPVerified(data) {
        logPracto('OTP verified successfully');
        console.log('Verification data:', data);
    }

    // Setup fallback booking (direct Practo redirect)
    function setupFallbackBooking() {
        logPracto('Setting up fallback booking via Practo redirect');
    }

    // Show notification helper
    function showNotification(message, type = 'info') {
        // Create a simple notification (you can customize this)
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        if (!document.querySelector('style[data-practo-animation]')) {
            style.setAttribute('data-practo-animation', 'true');
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Trigger Practo widget (used by booking buttons)
    function triggerPractoWidget() {
        logPracto('Triggering Practo widget');

        if (!practoInitialized) {
            logPracto('Widget not initialized yet, attempting to initialize...', 'warn');
            initializePractoWidget();
        }

        // Direct redirect to Practo profile
        // The widget element is a custom element that we cannot click directly
        // The most reliable method is to redirect to the Practo booking page
        logPracto('Opening Practo booking page');
        window.open(PRACTO_CONFIG.profileUrl, '_blank', 'noopener,noreferrer');
        
        // Show user-friendly notification
        showNotification('Opening Practo booking page...', 'info');
    }

    // Make functions globally available
    window.triggerPractoWidget = triggerPractoWidget;
    window.initializePractoWidget = initializePractoWidget;
    window.logPracto = logPracto;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            logPracto('Initializing Practo on DOMContentLoaded');
            initializePractoWidget();
        });
    } else {
        logPracto('Initializing Practo immediately (DOM already loaded)');
        initializePractoWidget();
    }

    // Also initialize after a small delay to ensure widget script is loaded
    setTimeout(() => {
        if (!practoInitialized) {
            logPracto('Attempting delayed initialization...');
            initializePractoWidget();
        }
    }, 1000);

})();
