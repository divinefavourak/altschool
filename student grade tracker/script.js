// ── Data 
// Our main data structure: an array of student objects
// Each object looks like: { id: number, name: string, grade: number }
let students = [];
let nextId = 1;

// ── localStorage helpers ───────────────────────────────────────────────────────
function saveToStorage() {
  localStorage.setItem('students', JSON.stringify(students));
  localStorage.setItem('nextId', nextId);
}

function loadFromStorage() {
  const saved = localStorage.getItem('students');
  if (saved) {
    students = JSON.parse(saved);
    nextId = Number(localStorage.getItem('nextId')) || students.length + 1;
  }
}

// ── Core logic ────────────────────────────────────────────────────────────────
function addStudent() {
  const nameInput = document.getElementById('studentName');
  const gradeInput = document.getElementById('studentGrade');
  const errorMessage = document.getElementById('errorMessage');

  const name = nameInput.value.trim();
  const grade = Number(gradeInput.value);

  // Validation
  if (name === '') {
    errorMessage.textContent = 'Please enter a student name.';
    return;
  }
  if (gradeInput.value === '' || isNaN(grade) || grade < 0 || grade > 100) {
    errorMessage.textContent = 'Grade must be a number between 0 and 100.';
    return;
  }

  errorMessage.textContent = '';

  // Build the student object and add it to the array
  const newStudent = { id: nextId, name: name, grade: grade };
  nextId++;
  students.push(newStudent);

  // Clear the form inputs
  nameInput.value = '';
  gradeInput.value = '';
  nameInput.focus();

  saveToStorage();
  renderStudents();
}

function deleteStudent(id) {
  // filter() returns a new array without the student that matches the id
  students = students.filter(function (student) {
    return student.id !== id;
  });

  saveToStorage();
  renderStudents();
}

function calculateAverage() {
  if (students.length === 0) return null;

  const total = students.reduce(function (sum, student) {
    return sum + student.grade;
  }, 0);

  return (total / students.length).toFixed(1);
}

// render the student list and average display
function renderStudents() {
  const studentList = document.getElementById('studentList');
  const averageDisplay = document.getElementById('averageDisplay');
  const emptyMessage = document.getElementById('emptyMessage');

  const average = calculateAverage();

  // Update average display
  averageDisplay.textContent = average !== null ? average : '--';

  // Show or hide the "no students" message
  emptyMessage.style.display = students.length === 0 ? 'block' : 'none';

  // Clear the table body and rebuild it
  studentList.innerHTML = '';

  students.forEach(function (student, index) {
    const row = document.createElement('tr');

    //student highlighted if above average
    if (average !== null && student.grade > Number(average)) {
      row.classList.add('above-average');
    }

    row.innerHTML =
      '<td>' + (index + 1) + '</td>' +
      '<td>' + student.name + '</td>' +
      '<td>' + student.grade + '</td>' +
      '<td><button class="delete-btn" onclick="deleteStudent(' + student.id + ')">Delete</button></td>';

    studentList.appendChild(row);
  });
}

// event listener
document.getElementById('addBtn').addEventListener('click', addStudent);

// Allow pressing Enter on the grade field to add the student
document.getElementById('studentGrade').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addStudent();
  }
});

// startup: load data and render
loadFromStorage();
renderStudents();
