SELECT DISTINCT R.CustomerID
FROM Rentals r
JOIN Inventory I ON r.CopyID = I.CopyID
JOIN Books b ON I.BookID = b.BookID
JOIN BookSuppliers sup ON b.BookID = sup.BookID
JOIN BookStores bs ON bs.BookstoreID = sup.BookstoreID
WHERE b.BookName = "Doraemon" OR bs.BookStoreName = "Shogakukan";

SELECT DISTINCT bs.BookStoreName
FROM BookStores bs
JOIN BookSuppliers sup ON bs.BookStoreID = sup.BookStoreID
JOIN Books b ON sup.BookID = b.BookID
WHERE b.BookName = 'Doraemon' and sup.price = (
    SELECT MIN(sup2.price)
    FROM BookSuppliers sup2
    ORDER BY sup.Price DESC
    LIMIT 1
);

SELECT DISTINCT bs.BookStoreName
FROM BookStores bs
JOIN BookSuppliers sup on sup.BookStoreID = bs.BookStoreID
GROUP BY bs.BookStoreID
HAVING COUNT(DISTINCT(sup.BookID)) = (
    SELECT COUNT(DISTINCT(BookID))
    FROM Inventory i
) 

SELECT DISTINCT T1.a1, T1.a2, T2.a3, T1.a4, T2.a5
FROM T1
INNER JOIN T2 ON ( (T1.a1 IS NOT NULL AND T1.a1 = T2.a1)
OR (T1.a2 IS NOT NULL AND T2.a2 = T1.a2) ) WHERE T2.a6 = "v"

SELECT DISTINCT T1.a1, T1.a2, T2.a3, T1.a4, T2.a5
FROM(
    SELECT T1.a1, T1.a2, T1.a4
    FROM T1
) as T1F
INNER JOIN (
    SELECT T2.a1, T2.a2, T2.a3, T2.a5, T2.a6
    FROM T2F
) ON (T2F.a1= T1F.a1 and T1F.a1 is NOT NULL) OR (T2F.a2= T1F.a2 and T1F.a2 is NOT NULL)
WHERE T2.a6 = 'v'

SELECT DISTINCT r.recipeID, h.vitamin, sum(r.weight*h.amount) as total_amount
FROM Recipe r
LEFT JOIN HasVita h ON r.ingredients = h.food
GROUP BY r.recipeID
HAVING (r.weight*h.amount) = (
    SELECT sum(r.weight*h.amount)
    FROM Recipe r2
    LEFT JOIN HasVita h2 ON r.ingredients = h.food
    order by sum(r.weight*h.amount) DESC
    LIMIT 1
)

SELECT p.title
FROM Project p
JOIN Assignment a on a.projID = p.projID
JOIN Employee e on e.empID = a.empID
WHERE p.category = "governmental" and e.gender = "Female"
group by p.projID
order by count(e.gender) DESC
limit 1

SELECT DISTINCT p.title
FROM Project p
JOIN Assignment a on a.projID = p.projID
JOIN Employee e on e.empID = a.empID
WHERE e.gender = "Female"
group by a.projID
HAVING COUNT(e.gender) > (
    SELECT count(e.gender)
    FROM Assignment a2
    JOIN Employee e on e.empID = a2.empID
    WHERE e.gender = "Male"
    group by a2.projID
)

SELECT DISTINCT e.first_name, e.last_name, e.salary
FROM Employee e
JOIN Department d on e.department_id = d.department_id
WHERE d.department_name = "IT"
order by e.last_name

SELECT d.department_name, sum(e.salary) as total_salary_expense
FROM Employee e
JOIN Department d on e.department_id = d.department_id
group by d.department_id
order by sum(e.salary) DESC

SELECT p.project_name,sum(ep.hours_worked) as total_hours_worked
FROM EmployeeProject ep
JOIN Project p on ep.project_id = p.project_id
group by ep.project_id
ORDER BY sum(ep.hours_worked) DESC

SELECT e.first_name, e.last_name, d.department_name
FROM Employee e
JOIN Department d on e.department_id = d.department_id
WHERE e.employee_id NOT IN(
    SELECT ep.employee_id
    FROM EmployeeProject ep
)
ORDER BY d.department_name, e.last_name

SELECT d.department_name, e.first_name, e.last_name, sum(ep.hours_worked)
FROM Department d
JOIN Employee e on e.department_id = d.department_id
JOIN EmployeeProject ep on ep.employee_id = e.employee_id
GROUP BY e.employee_id, d.department_id
HAVING sum(ep.hours_worked) = (
    SELECT sum(ep2.hours_worked)
    FROM EmployeeProject ep2
    JOIN Project p2 on p2.project_id = ep2.project_id
    WHERE p2.department_id = d.department_id
    group by ep.employee_id
    ORDER BY sum(ep2.hours_worked)
    LIMIT 1
)
ORDER BY d.department_id, e.employee_id

SELECT d.department_name, avg(e.salary) as average_salary
FROM Department d
JOIN Employee e on e.department_id = d.department_id
WHERE d.department_id in (
    SELECT d2.department_id
    FROM Employee e2
    JOIN Department d2 on e2.department_id = d2.department_id
    WHERE e2.employee_id NOT IN(
        SELECT ep.employee_id
        FROM EmployeeProject ep
    ) and d2.department_id = d.department_id
)
GROUP BY d.department_id
HAVING avg(e.salary) = (
    SELECT avg(e3.salary)
    FROM Employee e3
    JOIN Department d3 on e3.department_id = d3.department_id
    GROUP BY d3.department_id
    ORDER by avg(e3.salary) DESC
    LIMIT 1
)

SELECT a.actorName
FROM Actor a
WHERE a.actorID not in (
    SELECT p.actorID
    FROM Play p
    JOIN Studio s on p.studioID = s.studioID
    WHERE s.studioName = "ABC Studio"
)

SELECT s.studioName, count(f.filmID)
FROM Studio s
JOIN Film f on f.filmID = s.studioID
GROUP BY s.studioID

SELECT s.studioName
FROM Studio s
JOIN Film f on f.filmID = s.studioID
WHERE f.filmTitle like '007%'
GROUP BY s.studioID
HAVING COUNT(f.filmID > 5)

