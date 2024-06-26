-- Inserting data into Bars
INSERT INTO bars (id, name, adresse, tel, email, description, createdAt, updatedAt) VALUES 
(1,'Bar 1', 'Address 1', '1234567890', 'bar1@example.com', 'Description 1', datetime('now'), datetime('now') ),
(2,'Bar 2', 'Address 2', '2345678901', 'bar2@example.com', 'Description 2', datetime('now'), datetime('now') ),
(3,'Bar 3', 'Address 3', '3456789012', 'bar3@example.com', 'Description 3', datetime('now'), datetime('now') ),
(4,'Bar 4', 'Address 4', '4567890123', 'bar4@example.com', 'Description 4', datetime('now'), datetime('now') ),
(5,'Bar 5', 'Address 5', '5678901234', 'bar5@example.com', 'Description 5', datetime('now'), datetime('now') );

-- Inserting data into Bieres
INSERT INTO bieres (id, name, description, degree, prix, bars_id, createdAt, updatedAt) VALUES 
(1, 'Biere 1', 'Description 1', 4.5, 10.0, 1, datetime('now'), datetime('now')),
(2, 'Biere 2', 'Description 2', 5.0, 12.0, 2, datetime('now'), datetime('now')),
(3, 'Biere 3', 'Description 3', 5.5, 14.0, 3, datetime('now'), datetime('now')),
(4, 'Biere 4', 'Description 4', 6.0, 16.0, 4, datetime('now'), datetime('now')),
(5, 'Biere 5', 'Description 5', 6.5, 18.0, 5, datetime('now'), datetime('now')),
(null, 'Biere A', 'Description A', 4.5, 10.0, 1, datetime('now'), datetime('now')),
(null, 'Biere B', 'Description B', 5.0, 12.0, 1, datetime('now'), datetime('now')),
(null, 'Biere C', 'Description C', 5.5, 14.0, 1, datetime('now'), datetime('now')),
(null, 'Biere D', 'Description D', 6.0, 16.0, 1, datetime('now'), datetime('now')),
(null, 'Biere E', 'Description E', 6.5, 18.0, 1, datetime('now'), datetime('now')),
(null, 'Biere F', 'Description F', 7.0, 20.0, 1, datetime('now'), datetime('now')),
(null, 'Biere G', 'Description G', 7.5, 22.0, 1, datetime('now'), datetime('now')),
(null, 'Biere H', 'Description H', 8.0, 24.0, 1, datetime('now'), datetime('now')),
(null, 'Biere I', 'Description I', 8.5, 26.0, 1, datetime('now'), datetime('now')),
(null, 'Biere J', 'Description J', 9.0, 28.0, 1, datetime('now'), datetime('now'));

-- Inserting data into Commandes
INSERT INTO commandes (id, date, bars_id, createdAt, updatedAt) VALUES 
(1, '2022-01-01', 1, datetime('now'), datetime('now')),
(2, '2022-01-02', 2, datetime('now'), datetime('now')),
(3, '2022-01-03', 3, datetime('now'), datetime('now')),
(4, '2022-01-04', 4, datetime('now'), datetime('now')),
(5, '2022-01-05', 5, datetime('now'), datetime('now')),
(6, '2022-01-01', 2, datetime('now'), datetime('now'));


-- Inserting data into Biere_commande
INSERT INTO biere_commandes ( biere_id, commande_id, createdAt, updatedAt) VALUES 
(1, 1, datetime('now'), datetime('now')),
(2, 2, datetime('now'), datetime('now')),
(3, 3, datetime('now'), datetime('now')),
(4, 4, datetime('now'), datetime('now')),
(5, 5, datetime('now'), datetime('now')),
(6, 1, datetime('now'), datetime('now')),
(7, 1, datetime('now'), datetime('now')),
(8, 1, datetime('now'), datetime('now')),
(9, 1, datetime('now'), datetime('now')),
(10, 1, datetime('now'), datetime('now')),
(11, 1, datetime('now'), datetime('now')),
(12, 1, datetime('now'), datetime('now')),
(13, 1, datetime('now'), datetime('now')),
(14, 1, datetime('now'), datetime('now')),
(15, 1, datetime('now'), datetime('now'));

-- Inserting more data into Bieres for bar 2
INSERT INTO bieres (id,name, description, degree, prix, bars_id, createdAt, updatedAt) VALUES 
(null, 'Biere K', 'Description K', 4.5, 10.0, 2, datetime('now'), datetime('now')),
(null, 'Biere L', 'Description L', 5.0, 12.0, 2, datetime('now'), datetime('now')),
(null, 'Biere M', 'Description M', 5.5, 14.0, 2, datetime('now'), datetime('now')),
(null, 'Biere N', 'Description N', 6.0, 16.0, 2, datetime('now'), datetime('now')),
(null, 'Biere O', 'Description O', 6.5, 18.0, 2, datetime('now'), datetime('now'));



-- Inserting more data into Biere_commande for bar 2
INSERT INTO biere_commandes (biere_id, commande_id, createdAt, updatedAt) VALUES 
((SELECT seq FROM sqlite_sequence WHERE name = 'bieres') - 4, (SELECT seq FROM sqlite_sequence WHERE name = 'commandes'), datetime('now'), datetime('now')),
((SELECT seq FROM sqlite_sequence WHERE name = 'bieres') - 3, (SELECT seq FROM sqlite_sequence WHERE name = 'commandes'), datetime('now'), datetime('now')),
((SELECT seq FROM sqlite_sequence WHERE name = 'bieres') - 2, (SELECT seq FROM sqlite_sequence WHERE name = 'commandes'), datetime('now'), datetime('now')),
((SELECT seq FROM sqlite_sequence WHERE name = 'bieres') - 1, (SELECT seq FROM sqlite_sequence WHERE name = 'commandes'), datetime('now'), datetime('now')),
((SELECT seq FROM sqlite_sequence WHERE name = 'bieres'), (SELECT seq FROM sqlite_sequence WHERE name = 'commandes'), datetime('now'), datetime('now'));