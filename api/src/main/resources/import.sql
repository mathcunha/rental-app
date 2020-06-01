INSERT INTO roles values (1, 'ROLE_CLIENT');
INSERT INTO roles values (2, 'ROLE_REALTOR');
INSERT INTO roles values (3, 'ROLE_ADMIN');

INSERT INTO users values (1, 'admin@gmail.com', 'Admin', '$2a$10$51NqC03YWLWsdZTdTOi7EugWWiyCwU3o1Zg4inF88vYcjjDqF6R3K', 'admin');
INSERT INTO users values (2, 'realtor@gmail.com', 'Realtor', '$2a$10$51NqC03YWLWsdZTdTOi7EugWWiyCwU3o1Zg4inF88vYcjjDqF6R3K', 'realtor');
INSERT INTO users values (3, 'client@gmail.com', 'Client', '$2a$10$51NqC03YWLWsdZTdTOi7EugWWiyCwU3o1Zg4inF88vYcjjDqF6R3K', 'client');

INSERT INTO user_roles values (1, 1);
INSERT INTO user_roles values (1, 3);

INSERT INTO user_roles values (2, 1);
INSERT INTO user_roles values (2, 2);

INSERT INTO user_roles values (3, 1);