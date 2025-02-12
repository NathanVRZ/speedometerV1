const speedElement = document.getElementById('speed');
const gearElement = document.getElementById('gear');
const rpmBarElement = document.getElementById('rpm-bar');
const fuelBarElement = document.getElementById('fuel-bar');

function updateRPMColor(percentage) {
  // Create a gradient from green to red based on the percentage
  const hue = (1 - percentage) * 120; // 120 is green, 0 is red
  rpmBarElement.style.color = `hsl(${hue}, 100%, 50%)`;
}

function updateFuel() {
  // Simulate fuel consumption
  const currentHeight = parseFloat(fuelBarElement.style.height) || 70;
  const newHeight = Math.max(0, currentHeight - 0.1);
  fuelBarElement.style.height = `${newHeight}%`;
}

function updateSpeed() {
  const currentSpeed = parseInt(speedElement.textContent);
  const variation = Math.random() * 10 - 5; // Random variation between -5 and 5
  const newSpeed = Math.max(0, Math.min(200, Math.round(currentSpeed + variation)));
  speedElement.textContent = newSpeed.toString().padStart(3, '0');

  // Update gear based on speed
  let newGear;
  if (newSpeed < 20) newGear = 1;
  else if (newSpeed < 40) newGear = 2;
  else if (newSpeed < 80) newGear = 3;
  else if (newSpeed < 120) newGear = 4;
  else newGear = 5;

  gearElement.textContent = newGear;

  // Update RPM bar
  // Calculate RPM percentage based on speed within current gear range
  let rpmPercentage;
  const gearRanges = {
    1: [0, 20],
    2: [20, 40],
    3: [40, 80],
    4: [80, 120],
    5: [120, 200]
  };
  
  const currentRange = gearRanges[newGear];
  const rangeSize = currentRange[1] - currentRange[0];
  rpmPercentage = ((newSpeed - currentRange[0]) / rangeSize) * 100;
  rpmPercentage = Math.min(100, Math.max(0, rpmPercentage));

  rpmBarElement.style.width = `${rpmPercentage}%`;
  updateRPMColor(rpmPercentage / 100);
  
  // Update fuel level
  updateFuel();
}

setInterval(updateSpeed, 1000);