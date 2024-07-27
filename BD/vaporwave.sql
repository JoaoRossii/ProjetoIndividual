use vaporwave;

show tables;

select * from usuario;

use vaporwave;
show tables;

select * from usuario;

create table Tetris (
	id int primary key auto_increment,
    fkUsuario int,
    pontos int
);
alter table tetris 
add constraint fkUsuarioTetris
foreign key (fkUsuario) references usuario(ra);


desc tetris;         
desc usuario;         

select * from tetris;
select * from usuario;

update usuario set vaporwave = "Não" where ra in (4241001, 4241002, 4241016);

select nome, pontos from tetris
join usuario on ra = fkUsuario order by pontos desc LIMIT 10;

SELECT nome, pontos FROM (SELECT nome, pontos FROM tetris JOIN usuario ON ra = fkUsuario  ORDER BY pontos DESC LIMIT 10) AS Top10 ORDER BY pontos ASC;

select count(vaporwave), vaporwave from usuario group by vaporwave;