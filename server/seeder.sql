CREATE TABLE IF NOT EXISTS Products (
  product_id INT PRIMARY KEY,
  name varchar(250),
  slogan varchar(250),
  description varchar(750),
  catergory varchar(250),
  default_price INT
);

CREATE TABLE  IF NOT EXISTS Questions (
  question_id SERIAL ,
  product_id INT,
  FOREIGN KEY(product_id) REFERENCES Products(product_id),
  question_body varchar(250),
  question_date varchar(250),
  asker_name varchar(250),
  asker_email varchar(250),
  reported INT,
  question_helpfulness INT,
  PRIMARY KEY(question_id)
);


CREATE TABLE IF NOT EXISTS Answers (
  answer_id INT PRIMARY KEY,
  question_id INT,
  FOREIGN KEY(question_id) REFERENCES Questions(question_id),
  answer_body varchar(250),
  answer_date varchar(250),
  answerer_name varchar(250),
  answerer_email varchar(250),
  reported INT,
  answer_helpfulness INT
);

CREATE TABLE  IF NOT EXISTS Photos (
  photo_id INT PRIMARY KEY,
  answer_id INT,
  FOREIGN KEY(answer_id) REFERENCES Answers(answer_id),
  url varchar(250)
);

-- turn this sql to js
--turn database into object to pass in copy from

-- COPY persons(first_name, last_name, dob, email)
-- FROM 'C:\sampledb\persons.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY Products(product_id, name, slogan, description, catergory, default_price)
FROM '/Users/choke/Desktop/hack reactor/SDC/product.csv'
DELIMITER ','
CSV HEADER;

COPY Questions(question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
FROM '/Users/choke/Desktop/hack reactor/SDC/questions.csv'
DELIMITER ','
CSV HEADER;

COPY Answers(answer_id, question_id, answer_body, answer_date, answerer_name, answerer_email, reported, answer_helpfulness)
FROM '/Users/choke/Desktop/hack reactor/SDC/answers.csv'
DELIMITER ','
CSV HEADER;

COPY Photos(photo_id, answer_id, url)
FROM '/Users/choke/Desktop/hack reactor/SDC/answers_photos.csv'
DELIMITER ','
CSV HEADER;

SELECT setval('questions_question_id_seq', (SELECT max(question_id) FROM Questions));
SELECT setval('answers_answer_id_seq', (SELECT max(answer_id) FROM Answers));
SELECT setval('photos_photo_id_seq', (SELECT max(photo_id) FROM Photos));
--want to index columns being used
-- CREATE INDEX index_questions ON Questions (product_id);
-- CREATE INDEX index_answers ON Answers (answers_id);
-- CREATE INDEX index_products ON Products (product_id);