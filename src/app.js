// Style injection for hover states of the upvote button
const style = document.createElement('style');
style.textContent = `
  #vote-btn.green-btn:hover:not(:disabled) {
    background: rgba(0, 255, 65, 0.1) !important;
    color: rgb(0, 255, 65) !important;
    box-shadow: 0 0 25px rgba(0, 255, 65, 0.5), inset 0 0 15px rgba(0, 255, 65, 0.2) !important;
    transform: translateY(-2px);
  }
  #vote-btn.red-btn:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.1) !important;
    color: rgb(239, 68, 68) !important;
    border-color: rgb(239, 68, 68) !important;
    box-shadow: 0 0 25px rgba(239, 68, 68, 0.5), inset 0 0 15px rgba(239, 68, 68, 0.2) !important;
    transform: translateY(-2px);
  }
  #vote-btn:active:not(:disabled) {
    transform: translateY(0);
  }
  #vote-btn:disabled {
    cursor: not-allowed !important;
    opacity: 0.6;
  }
`;
document.head.appendChild(style);

// Helper to show custom cyber-glowing toast alerts
function showToast(message, type = 'success') {
  const container = document.getElementById('vote-toast-container') || (() => {
    const el = document.createElement('div');
    el.id = 'vote-toast-container';
    el.style.cssText = 'position: fixed; bottom: 180px; right: 24px; z-index: 10000; display: flex; flex-direction: column; gap: 10px; font-family: "JetBrains Mono", monospace; pointer-events: none;';
    document.body.appendChild(el);
    return el;
  })();

  const toast = document.createElement('div');
  const isSuccess = type === 'success';
  const borderColor = isSuccess ? 'rgb(0, 255, 65)' : 'rgb(245, 158, 11)';
  const glowColor = isSuccess ? 'rgba(0, 255, 65, 0.4)' : 'rgba(245, 158, 11, 0.4)';
  const textColor = isSuccess ? 'rgb(0, 255, 65)' : 'rgb(245, 158, 11)';

  toast.style.cssText = `
    background: rgba(15, 20, 28, 0.95);
    border: 1px solid ${borderColor};
    color: ${textColor};
    padding: 12px 20px;
    font-size: 13px;
    font-weight: bold;
    box-shadow: 0 0 15px ${glowColor};
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: auto;
  `;

  const iconSvg = isSuccess 
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  toast.offsetHeight;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// UI State: Submit / Vote (Green Theme)
function setSubmitState(button, input, widget) {
  input.disabled = false;
  input.style.display = 'block';
  input.value = '';
  
  button.className = 'w-full flex items-center justify-center gap-2 bg-primary text-black font-bold p-2.5 text-xs rounded border border-primary hover:shadow-[0_0_15px_rgba(0,255,65,0.4)] cursor-pointer transition-all duration-300 uppercase tracking-wider outline-none green-btn';
  button.style.background = '';
  button.style.color = '';
  button.style.borderColor = '';
  button.style.boxShadow = '';
  
  const text = button.querySelector('#vote-btn-text');
  if (text) text.textContent = 'SUBMIT & VOTE';
  
  const icon = button.querySelector('#vote-icon');
  if (icon) {
    icon.innerHTML = '<path d="m18 15-6-6-6 6"/>';
  }

  widget.style.borderColor = '';
  widget.style.boxShadow = '';
}

// UI State: Unvote / Remove Vote (Red Theme)
function setUnvoteState(button, input, widget, phoneNumber) {
  input.disabled = true;
  input.style.display = 'none';
  input.value = phoneNumber;

  button.className = 'w-full flex items-center justify-center gap-2 bg-red-500 text-white font-bold p-2.5 text-xs rounded border border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] cursor-pointer transition-all duration-300 uppercase tracking-wider outline-none red-btn';
  button.style.background = 'rgb(239, 68, 68)';
  button.style.color = 'rgb(255, 255, 255)';
  button.style.borderColor = 'rgb(239, 68, 68)';
  button.style.boxShadow = '0 0 15px rgba(239, 68, 68, 0.4)';
  
  const text = button.querySelector('#vote-btn-text');
  if (text) text.textContent = 'UNVOTE / REMOVE VOTE';

  const icon = button.querySelector('#vote-icon');
  if (icon) {
    icon.innerHTML = '<path d="m18 9-6 6-6-6"/>';
  }

  widget.style.borderColor = 'rgb(239, 68, 68)';
  widget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.2), inset 0 0 15px rgba(239, 68, 68, 0.1)';
}

function initVoteSystem() {
  const voteBtn = document.getElementById('vote-btn');
  const voteBadge = document.getElementById('vote-badge');
  const userPhone = document.getElementById('userPhone');
  const widget = document.getElementById('poster-vote-widget');

  if (!voteBtn || !voteBadge || !userPhone || !widget) {
    setTimeout(initVoteSystem, 100);
    return;
  }

  // Fetch initial total votes
  fetch('/api/vote/count')
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      voteBadge.textContent = data.totalVotes;
    })
    .catch(() => {
      voteBadge.textContent = '0';
    });

  // Check if we have a saved phone number
  const savedPhone = localStorage.getItem('voted_phone_number');
  if (savedPhone) {
    // Verify check on page load
    fetch('/api/vote/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber: savedPhone })
    })
      .then(res => res.json())
      .then(data => {
        if (data.exists) {
          setUnvoteState(voteBtn, userPhone, widget, savedPhone);
        } else {
          localStorage.removeItem('voted_phone_number');
          setSubmitState(voteBtn, userPhone, widget);
        }
      })
      .catch(() => {
        setUnvoteState(voteBtn, userPhone, widget, savedPhone);
      });
  } else {
    setSubmitState(voteBtn, userPhone, widget);
  }

  // Check phone number on input blur
  userPhone.addEventListener('blur', () => {
    const phoneNumber = userPhone.value.trim();
    if (!phoneNumber || localStorage.getItem('voted_phone_number')) return;

    fetch('/api/vote/check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber })
    })
      .then(res => res.json())
      .then(data => {
        if (data.exists) {
          showToast('This phone number has already voted!', 'warning');
        }
      })
      .catch(() => {});
  });

  // Handle click button event
  voteBtn.addEventListener('click', () => {
    const isUnvoteMode = voteBtn.classList.contains('red-btn');

    if (isUnvoteMode) {
      // UNVOTE Flow
      const phoneNumber = localStorage.getItem('voted_phone_number') || userPhone.value.trim();
      if (!phoneNumber) {
        showToast('No phone number found to remove vote.', 'warning');
        setSubmitState(voteBtn, userPhone, widget);
        return;
      }

      voteBtn.disabled = true;

      fetch('/api/unvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      })
        .then(async res => {
          const data = await res.json();
          voteBtn.disabled = false;
          if (res.status === 200) {
            localStorage.removeItem('voted_phone_number');
            voteBadge.textContent = data.totalVotes;
            setSubmitState(voteBtn, userPhone, widget);
            showToast('Vote removed successfully!', 'success');
          } else {
            showToast(data.message || 'Failed to remove vote.', 'warning');
          }
        })
        .catch(err => {
          console.error(err);
          voteBtn.disabled = false;
          showToast('Network error. Failed to remove vote.', 'warning');
        });

    } else {
      // VOTE Flow
      const phoneNumber = userPhone.value.trim();
      if (!phoneNumber) {
        showToast('Please enter a valid phone number.', 'warning');
        return;
      }

      voteBtn.disabled = true;

      fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      })
        .then(async res => {
          const data = await res.json();
          voteBtn.disabled = false;
          if (res.status === 200) {
            localStorage.setItem('voted_phone_number', phoneNumber);
            voteBadge.textContent = data.totalVotes;
            setUnvoteState(voteBtn, userPhone, widget, phoneNumber);
            showToast('Vote registered successfully!', 'success');
          } else if (res.status === 400) {
            // Already voted
            localStorage.setItem('voted_phone_number', phoneNumber);
            setUnvoteState(voteBtn, userPhone, widget, phoneNumber);
            showToast('This phone number has already voted.', 'warning');
          } else {
            showToast(data.message || 'Failed to register vote.', 'warning');
          }
        })
        .catch(err => {
          console.error(err);
          voteBtn.disabled = false;
          showToast('Network error. Failed to submit vote.', 'warning');
        });
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVoteSystem);
} else {
  initVoteSystem();
}
