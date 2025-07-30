// Mock toast functions for better styling
const toast = {
  success: (message) => {
    const toastEl = document.createElement('div');
    toastEl.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        color: #333;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        border-bottom: 4px solid #620080;
        animation: slideIn 0.3s ease-out;
        min-width: 280px;
      ">
        ${message}
      </div>
    `;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => document.body.removeChild(toastEl), 300);
    }, 3500);
  },
  error: (message) => {
    const toastEl = document.createElement('div');
    toastEl.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        color: #333;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        border-bottom: 4px solid #dc2626;
        animation: slideIn 0.3s ease-out;
        min-width: 280px;
      ">
        ${message}
      </div>
    `;
    document.body.appendChild(toastEl);
    setTimeout(() => {
      toastEl.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => document.body.removeChild(toastEl), 300);
    }, 3500);
  }
};
export default toast;