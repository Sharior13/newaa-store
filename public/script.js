document.getElementById('orderForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
  
    const response = await fetch('/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    alert(result.message);
  });
  