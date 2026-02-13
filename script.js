document.getElementById('calculate').addEventListener('click', calculateAttendance);

function calculateAttendance() {
    const requiredPercentage = parseFloat(document.getElementById('percentage').value) / 100;
    const present = parseInt(document.getElementById('present').value);
    const total = parseInt(document.getElementById('total').value);
    const resultDiv = document.getElementById('result');
    const resultText = document.querySelector('.result-text');
    const attendanceInfo = document.querySelectorAll('.attendance-info');
    
    // Input validation
    if (isNaN(present) || isNaN(total) || present < 0 || total <= 0 || present > total) {
        resultText.textContent = "Please enter valid numbers. Present days should be between 0 and total days.";
        attendanceInfo[0].textContent = '';
        attendanceInfo[1].textContent = '';
        return;
    }
    
    const currentPercent = (present / total) * 100;
    const resultContainer = document.querySelector('.result');
    resultContainer.style.display = 'block';
    
    // Handle 100% case separately
    if (requiredPercentage === 1) {
        if (present === total) {
            resultText.textContent = "You can bunk for 0 more days.";
            attendanceInfo[0].textContent = `Current Attendance: ${present}/${total} → ${currentPercent.toFixed(2)}%`;
            attendanceInfo[1].textContent = `Attendance Then: ${present}/${total} → ${currentPercent.toFixed(2)}%`;
            attendanceInfo[1].classList.add('highlight');
        } else {
            resultText.textContent = "It is impossible to attain 100% attendance.";
            attendanceInfo[0].textContent = `Current Attendance: ${present}/${total} → ${currentPercent.toFixed(2)}%`;
            attendanceInfo[1].textContent = '';
        }
        return;
    }
    
    // Calculate for regular percentages
    if (currentPercent >= requiredPercentage * 100) {
        // Case 1: Can bunk days
        const x = Math.floor((present / requiredPercentage) - total);
        const futureTotal = total + x;
        const futureAttendance = (present / futureTotal) * 100;
        
        resultText.textContent = `You can bunk for ${x} more days.`;
        attendanceInfo[0].textContent = `Current Attendance: ${present}/${total} → ${currentPercent.toFixed(2)}%`;
        attendanceInfo[1].textContent = `Attendance Then: ${present}/${futureTotal} → ${futureAttendance.toFixed(2)}%`;
        attendanceInfo[1].classList.add('highlight');
    } else {
        // Case 2: Need to attend more days
        const numerator = (requiredPercentage * total) - present;
        const denominator = 1 - requiredPercentage;
        const x = Math.ceil(numerator / denominator);
        const futureTotal = total + x;
        const futurePresent = present + x;
        const futureAttendance = (futurePresent / futureTotal) * 100;
        
        resultText.textContent = `You need to attend ${x} more classes to attain ${requiredPercentage * 100}% attendance.`;
        attendanceInfo[0].textContent = `Current Attendance: ${present}/${total} → ${currentPercent.toFixed(2)}%`;
        attendanceInfo[1].textContent = `Attendance Required: ${futurePresent}/${futureTotal} → ${futureAttendance.toFixed(2)}%`;
        attendanceInfo[1].classList.add('highlight');
    }
}

// Initialize with sample values
document.getElementById('present').value = 100;
document.getElementById('total').value = 100;
calculateAttendance();