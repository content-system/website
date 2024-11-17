create table news (
  id varchar(40) primary key,
  title varchar(255) not null,
  description varchar(1200) not null,
  content varchar(5000),
  published_at timestamptz,
  tags character varying[],
  thumbnail varchar(400),
  high_thumbnail varchar(400),
  status char(1)
);

INSERT INTO news (id,title,description,"content",published_at,tags,thumbnail,high_thumbnail,status) VALUES
	 ('20240917001','FPT Expands Global Workforce to 80,000 amid Its 36th Anniversary','FPT Corporation recently announced a significant milestone, passing 80,000 employees across 30 countries. The milestone coincides with the company’s 36th anniversary and underscores its remarkable growth and global expansion.','FPT Corporation recently announced a significant milestone, passing 80,000 employees across 30 countries. The milestone coincides with the company’s 36th anniversary and underscores its remarkable growth and global expansion.','2024-09-17 16:46:34.763+07','{}','https://fptsoftware.com/-/media/project/fpt-software/global/80000.png','https://fptsoftware.com/-/media/project/fpt-software/global/80000.png','A'),
	 ('20240722001','FPT to Bolster Growth among Francophone Community, Emphasizing Workforce Development','FPT Corporation recently hosted the FPT Francophone Day, a dynamic networking and culture exchange platform for the French-speaking community in Vietnam. The event also marked the inauguration of FPT Francophone Association, highlighting the IT firm’s commitment to fostering its French-proficient professionals and nurturing opportunities for business and culture exchange.','Global technology corporation FPT recently hosted the FPT Francophone Day, a dynamic networking and culture exchange platform for the French-speaking community in Vietnam. At the event, FPT introduced the FPT Francophone Association, a move to foster its French-proficient professionals and nurture opportunities for business and culture exchange.','2024-07-22 17:06:23.844+07','{}','https://fptsoftware.com/-/media/project/fpt-software/global/common/fptsoftware_building_d/francophone-day-2024_1.webp','https://fptsoftware.com/-/media/project/fpt-software/global/common/fptsoftware_building_d/francophone-day-2024_1.webp','A'),
	 ('20240912001','FPT Software Earns First Hong Kong Business Technology Excellence Award for its Agent Digital Platform in Insurtech','Global leading IT company FPT Software has earned recognition at the Hong Kong Business Technology Excellence Awards in the Software - Insurtech category. This marks the first time the company has received this prestigious award, reinforcing its status as a trusted service provider in the insurance sector.','Global leading IT company FPT Software has earned recognition at the Hong Kong Business Technology Excellence Awards in the Software - Insurtech category for its groundbreaking Agent Digital Platform (ADP). This marks the first time the company has received this prestigious award, reinforcing its status as a trusted service provider in the insurance sector.','2024-09-12 16:48:10.238+07','{}','https://fptsoftware.com/-/media/project/fpt-software/fso/675a1663.webp','https://fptsoftware.com/-/media/project/fpt-software/fso/675a1663.webp','A'),
	 ('20240826001','FPT Opens New Office in Shanghai, China','FPT China recently celebrated the opening of a new office in Shanghai, in response to the growing customer base and increasing demand for digital services and solutions. The tech firm is set to transform the Shanghai office into a leading hub for talent and technology with accelerated AI integration across its services to deliver unmatched innovation to customers worldwide.','Located in one of Shanghai’s most dynamic business districts, this new office allows FPT to further solidify its delivery and consulting capacities for global clients across industries in the Chinese market. The area is also home to several industry giants in the fields of aerospace, automotive, health tech, and artificial intelligence, boasting a well-developed transport infrastructure and supportive business policies for multinational enterprises.','2024-08-26 16:49:52.453+07','{}','https://fptsoftware.com/-/media/project/fpt-software/global/fpt_shanghai.webp','https://fptsoftware.com/-/media/project/fpt-software/global/fpt_shanghai.webp','A'),
	 ('20240823001','Feature Interview: Low-Code Development Platform Adoption and How FPT Software Is Leading the Charge in South Korea','This in-depth interview discusses the rapid adoption of low-code platforms globally, with a focus on key markets such as South Korea.','In today’s complex and competitive business environment, many organizations are adopting low-code as a viable alternative to traditional software development. Gartner predicts that by 2026, the global low-code development platform market is projected to reach an impressive USD 44.5 billion. This exponential growth is fueled by the rising need for digital transformation across industries and the ongoing shortage of skilled developers.','2024-08-23 16:51:46.338+07','{}','https://fptsoftware.com/-/media/project/fpt-software/global/common/fptsoftware_building_d/455863996_3699023507019198_7345037110881035098_n.webp','https://fptsoftware.com/-/media/project/fpt-software/global/common/fptsoftware_building_d/455863996_3699023507019198_7345037110881035098_n.webp','A'),
	 ('20240819001','FPT Software and Meerana Technologies Partner to Drive Digital Transformation in UAE','This partnership aims to expand FPT Software’s footprint in the region and address the market needs across various sectors, including Utilities, BFSI, Logistics, Transportation, and more.','The two firms will collaborate to harness FPT Software’s expertise in Artificial Intelligence, Semiconductors, and other advanced technologies, integrating them into Meerana Technologies’s existing products and solutions. By combining Meerana Technologies'' strong presence in UAE with FPT Software’s diverse service offerings, this partnership aims to expand FPT Software’s footprint in the region and address the market needs across various sectors, including Utilities, BFSI, Logistics, Transportation, and more.','2024-08-19 16:54:56.268+07','{}','https://fptsoftware.com/-/media/project/fpt-software/fso/uplift/fme-1.png','https://fptsoftware.com/-/media/project/fpt-software/fso/uplift/fme-1.png','A'),
	 ('20240930001','FPT Software Wins Job Creation Award at ESGBusiness Awards 2024','This recognition highlights FPT Software''s commitment to nurturing top talent and fostering diverse and inclusive workplaces across the global IT industry.','HANOI, Vietnam - FPT Software recently received the Job Creation Award - Vietnam at the ESGBusiness Awards 2024, marking its debut win in this award. This accolade underscores the company’s steadfast commitment to nurturing top talent across the global IT industry while promoting diverse and inclusive workplaces.

FPT Software currently boasts a global workforce of over 30,000 employees spanning 30 countries, with an annual growth rate of 25% and an industry-low attrition rate of 12%. Last year, the company recorded 12,000 new hires. This steady employment growth significantly supports its parent company, FPT Corporation''s goal of employing one million IT professionals by 2035. 

The firm has also proactively established pathways for Vietnamese employees to gain international experience, with over 3,000 individuals currently working in its overseas branches. Meanwhile, FPT Software has also made significant efforts to attract foreign talent, currently employing more than 3,500 foreign staff from 75 nationalities. Across its global operations, local employees account for an average of 13% of the workforce, notably 85% in Europe, 64% in the Americas, and 30% in Japan, FPT Software’s largest overseas market.

As FPT Software expands its global footprint and enhances its technical capabilities and customer network, it remains committed to creating high-quality jobs and opportunities for employees to engage in complex projects for leading businesses worldwide, particularly in high-demand sectors such as automotive, cloud, AI, and semiconductors. 

The recognition in the ESG Business Awards 2024 is also attributed to FPT Software’s diversity and inclusion. The firm fosters gender equality across international operations, with women making up 39.6% of its workforce and 33% of managerial roles. 

FPT Software’s commitment to workforce development is also reflected by its promotion of continuous learning and extensive growth opportunities for all employees. On average, its employees complete 31.7 hours of professional training annually, benefiting from partnerships with leading platforms such as Mila, Udacity, Coursera, Udemy, British Council, and so on.

Most recently, the company announced a 125 billion VND investment to provide training and career development opportunities to over 3,000 Japanese-speaking ICT professionals. This initiative, launched in collaboration with 15 universities in its first phase and planned for nationwide implementation, underscores FPT Software''s dedication to workforce development, fostering a future-ready workforce while creating employment opportunities that align with the demands of the evolving IT landscape.

Nguyen Tuan Minh, Chief Human Resources Officer of FPT Software, said: “As FPT Software expands globally, cultivating a highly skilled workforce and creating more employment opportunities are crucial to meeting the diverse needs of our clients across various industries. Our top priorities include investing in education, training, and fostering a dynamic workplace environment. FPT Software is dedicated to building a future-ready IT talent pool, contributing to the advancement of this sector not only in Vietnam but also globally.”

The ESGBusiness Awards 2024 honours Asian businesses that demonstrate outstanding commitment and achievement in environmental, social, and governance (ESG) practices. This year, the programme received applicants from over 100 leading companies in Asia. The panel of judges comprises leaders and experts from top consulting firms, including KPMG, PwC, Ernst & Young, and Boston Consulting Group.

Prior to this, FPT Software was recognized with numerous accolades, including Great Place to Work® Certifications across Asia Pacific, Japan, the United States, Vietnam, Germany, and the Philippines. Most recently, the company was awarded the BRONZE STEVIE® for Employer of the Year at the 2024 Stevie® Awards for Great Employers.

About FPT Software
FPT Software, a subsidiary of FPT Corporation, is a global technology and IT services provider headquartered in Vietnam, with $1 billion in revenue (2023) and over 30,000 employees in 30 countries.

The company champions complex business opportunities and challenges with its world-class services in Advanced Analytics, AI, Digital Platforms, Cloud, Hyperautomation, IoT, Low-code, and so on. It has partnered with over 1,100 clients worldwide, nearly 100 of which are Fortune Global 500 companies in Aviation, Automotive, Banking, Financial Services and Insurance, Healthcare, Logistics, Manufacturing, Utilities, and more. For more information, please visit https://fptsoftware.com/ 
','2024-09-30 16:45:00.266+07',NULL,'https://fptsoftware.com/-/media/project/fpt-software/fso/uplift/1.png','https://fptsoftware.com/-/media/project/fpt-software/fso/uplift/1.png','A'),
	 ('20240717001','FPT Software Adopts Green Tuesday Initiative to Accelerate Sustainable Movement','FPT Software officially became a partner of the Green Tuesday Initiative, aiming to cut down food-related footprint on the organizational scale. As the first Vietnamese enterprise to join the program, this move further highlights the IT firm''s steadfast progress and commitment to green transformation and sustainable development.','As part of the initiative, FPT Software targets to cut down on serving meat production in its campus cafeterias across Vietnam with more climate-friendly and plant-based alternatives once a week. To realize this goal, the Green Tuesday program will support participating organizations with training on low carbon footprint and climate-friendly diet, as well as auditing and conducting bi-yearly impact reports. Additionally, both sides will collaborate to raise awareness for FPT Software''s employees through a series of onsite promotional activities.','2024-07-17 17:08:14.069+07','{}','https://fptsoftware.com/-/media/project/fpt-software/fso/green-tuesday-initiative.webp','https://fptsoftware.com/-/media/project/fpt-software/fso/green-tuesday-initiative.webp','A'),
	 ('20240709001','FPT Software and VinCSS Join Hands to Accelerate Cybersecurity in Automotive Industry','FPT Software and VinCSS recently signed a Memorandum of Understanding (MoU) targeting the automotive sector. The partnership enables both companies to enhance their solutions by leveraging each other’s resources, expertise, and network.','FPT Software and VinCSS recently signed a Memorandum of Understanding (MoU) targeting the automotive sector. The collaboration will benefit Original Equipment Manufacturers (OEMs) and Tier 1 suppliers by providing access to a broader range of solutions and services that comply with global industry standards. ','2024-07-09 17:11:14.232+07','{}','https://fptsoftware.com/-/media/project/fpt-software/fso/post_fso-x-vincss.png','https://fptsoftware.com/-/media/project/fpt-software/fso/post_fso-x-vincss.png','A'),
	 ('20240708001','FPT Japan Joins Leading IT Companies in Forming the Vietnamese Association of Digital Transformation in Japan','The Vietnamese Association of Digital Transformation in Japan (VADX Japan) was officially launched in Tokyo, Japan, with FPT Japan serving as the Association''s Chair Company and Do Van Khac, Senior Executive Vice President of FPT Software and CEO of FPT Japan, serving as the company’s representative. This initiative represents FPT Japan’s ongoing commitment to enhancing cooperation and development in digital technology between Vietnam and Japan.','The Association''s launch event was attended by  Ambassador-Designate of the Socialist Republic of Viet Nam to Japan H.E. Pham Quang Hieu, Minister-Counselor Nguyen Duc Minh, representatives from Viet Nam’s Ministry of Science and Technology, Ministry of Planning and Investment, Ministry of Industry and Trade, and Ministry of Education and Training, Chairman of the Founding Council of the Vietnam Software and IT Services Association (VINASA) and Chairman of FPT Corporation Truong Gia Binh, and esteemed leaders of Vietnamese associations here.','2024-07-08 17:14:08.978+07','{}','https://fptsoftware.com/-/media/project/fpt-software/fso/newsroom/newsroom/news080724.webp','https://fptsoftware.com/-/media/project/fpt-software/fso/newsroom/newsroom/news080724.webp','A');
INSERT INTO news (id,title,description,"content",published_at,tags,thumbnail,high_thumbnail,status) VALUES
	 ('20240704001','FPT Software Welcomes First Batch of Global Interns to Vietnam for the Global Internship Program 2024','Returning for the second edition, the program has seen a fourfold increase in international student participation compared to last year, with students representing a wider variety of countries','On July 1, 2024, FPT Software welcomed the first cohort of international students to its Global Internship program, designed to provide students with opportunities to accelerate their technology careers through professional experiences at a leading global IT company. Returning for the second edition, the program has seen a fourfold increase in international student participation compared to last year, with students representing a wider variety of countries.','2024-07-04 17:19:23.269+07','{}','https://fptsoftware.com/-/media/project/fpt-software/global/common/fptsoftware_building_d/fpt-global-internship-frame-(8).webp','https://fptsoftware.com/-/media/project/fpt-software/global/common/fptsoftware_building_d/fpt-global-internship-frame-(8).webp','A'),
	 ('20240701001','FPT Software Wins 2nd Runner-Up at SAP Hack2Build Contest','FPT Software Wins 2nd Runner-Up at SAP Hack2Build Contest','FPT Software has achieved the 2nd Runner Up at the SAP Hack2Build contest with its AI-enabled and innovative B2B retail solution, mySalesPro. Notably, FPT Software was the only Vietnam-headquartered company competing alongside top global firms such as EY, Deloitte, IBM, and PWC.','2024-07-01 17:21:19.512+07','{}','https://fptsoftware.com/-/media/project/fpt-software/fso/448926222_763543399021830_4527054500824727171_n.webp','https://fptsoftware.com/-/media/project/fpt-software/fso/448926222_763543399021830_4527054500824727171_n.webp','A'),
	 ('20240605001','Vietnam Tech Revolution Story to Be Featured on Discovery Channel, With FPT in the Spotlight','FPT Corporation (FPT) collaborates with Warner Bros. Discovery in an upcoming documentary titled “Silicon Delta - The Story of Vietnam’s Tech Revolution.” The documentary highlights Vietnam as a leading digital economy of Southeast Asia, with FPT at the forefront of the country’s transformation into a global destination for business and innovation','The film features senior leaders from FPT and its subsidiary, including FPT Chairman Truong Gia Binh, FPT Software Chairwoman Chu Thi Thanh Ha, FPT Software CEO Pham Minh Tuan, FPT Software SEVP Nguyen Khai Hoan, and FPT Software Chief AI Officer Phong Nguyen; as well as other experts. They reflect on the stories of FPT’s establishment in the late 1980s with the goal of surviving poverty and the ambitious dream of bringing Vietnamese intelligence to the global stage. “From the sixties to the eighties, there’s constant hunger. I just need some company to help us survive. That’s why FPT [was founded]”, said FPT Chairman Truong Gia Binh.','2024-06-05 17:23:07.571+07','{}','https://fptsoftware.com/-/media/project/fpt-software/fso/newsroom/news---press-release/dsc00136.webp','https://fptsoftware.com/-/media/project/fpt-software/fso/newsroom/news---press-release/dsc00136.webp','A'),
	 ('20240530001','FPT Issues First-Ever Environmental Policy, Strengthening Sustainable Commitment','This policy provides a detailed plan for implementing specific steps to reduce greenhouse gas (GHG) emissions, aiming at becoming Vietnam''s pioneering company to achieve Net Zero emissions by 2040.','This policy provides a detailed plan for implementing specific steps to reduce greenhouse gas (GHG) emissions, aiming at becoming Vietnam''s pioneering company to achieve Net Zero emissions by 2040.','2024-05-30 17:25:05.967+07','{}','https://fptsoftware.com/-/media/project/fpt-software/fso/newsroom/news---press-release/fpt-issues-first-ever-environmental-policy.webp','https://fptsoftware.com/-/media/project/fpt-software/fso/newsroom/news---press-release/fpt-issues-first-ever-environmental-policy.webp','A');

CREATE TABLE jobs (
  id character varying(40) not null primary key,
  title character varying(300),
  description character varying(2000),
  published_at timestamptz,
  expired_at timestamptz,
  location character varying(1000),
  quantity integer default 1,
  applicant_count integer default 1,
  requirements character varying(2000),
  benefit character varying(1000),
  skills character varying[],
  company_id character varying(40)
);

INSERT INTO jobs(id, title, description, published_at, expired_at, location, quantity, applicant_count, requirements, benefit, company_id)  VALUES ('senior-backend-developer', 'Senior Backend Developer (Java, Kotlin, MySQL)', '• Analyze and organize raw data
• Build data systems and pipelines
• Prepare data for prescriptive and predictive modeling
• Combine raw information from different sources
• Explore ways to enhance data quality and reliability
• Identify opportunities for data acquisition
• Data pipeline maintenance/testing.', '2023-05-24 17:00:00+00', '2023-05-29 17:00:00+00', 'Hanoi', 1, 1, 'asdsadasd', 'Analyze and organize raw data

Build data systems and pipelines

Prepare data for prescriptive and predictive modeling

Combine raw information from different sources
Explore ways to enhance data quality and reliability
Identify opportunities for data acquisition
Data pipeline maintenance/testing.', 'mb-bank');
INSERT INTO jobs(id, title, description, published_at, expired_at, location, quantity, applicant_count, requirements, benefit, company_id) VALUES ('business-analyst-jp', 'Business Analyst (Japanese)', 'Previous experience as a data engineer or in a similar role

Technical expertise with data models, data mining, and segmentation techniques

Knowledge of programming languages (e.g. Java and Python)
Experience with data architecture and data modeling
Hands-on experience with SQL database design
Great numerical and analytical skills

Degree in Computer Science, IT, or similar field; a Masters is a plus

Data engineering certification (e.g IBM Certified Data Engineer) is a plus
', '2023-05-24 17:00:00+00', '2023-05-30 17:00:00+00', 'Danang', 1, 2, '<ul style="padding: 0px 0px 0px 2rem; margin-right: 0px; margin-bottom: 1rem; margin-left: 0px; color: rgb(58, 58, 58); font-family: Roboto, sans-serif; font-size: 16px; letter-spacing: normal;"><li>Previous experience as a data engineer or in a similar role</li><li>Technical expertise with data models, data mining, and segmentation techniques</li><li>Knowledge of programming languages (e.g. Java and Python)</li><li>Experience with data architecture and data modeling</li><li>Hands-on experience with SQL database design</li><li>Great numerical and analytical skills</li><li>Degree in Computer Science, IT, or similar field; a Masters is a plus</li><li>Data engineering certification (e.g IBM Certified Data Engineer) is a plus</li></ul>', '• • • Previous experience as a data engineer or in a similar role
• • • Technical expertise with data models, data mining, and segmentation techniques
• • • Knowledge of programming languages (e.g. Java and Python)
• • • Experience with data architecture and data modeling', 'mb-bank');
INSERT INTO jobs(id, title, description, published_at, expired_at, location, quantity, applicant_count, requirements, benefit, company_id) VALUES ('senior-devops-engineer', 'Senior DevOps Engineer - Salary Up to $2800', '1. Collaborate with Front-End Developers to integrate user-facing elements with server-side logic and other applications APIs;
2. Maintain and improve running-functionality as well as design and develop new system, new feature; d
3. Develop and maintain Back-End Code that improves analytical and statistical modeling and forecasting methods to support business tribes in their decision-making process;
4. Create data structures from scratch;
5. Actively test and debug code defect;
6. Research to learn technology and knowledge needed to develop products for the global market.', '2023-05-24 17:00:00+00', '2023-05-30 17:00:00+00', 'Cantho', 1, 1, '1. Analyze and organize raw data
2. Build data systems and pipelines
3. Prepare data for prescriptive and predictive modeling
4. Combine raw information from different sources
5. Explore ways to enhance data quality and reliability
6. Identify opportunities for data acquisition
7. Data pipeline maintenance/testing.', '1. Analyze and organize raw data
2. Build data systems and pipelines
3. Prepare data for prescriptive and predictive modeling
4. Combine raw information from different sources
5. Explore ways to enhance data quality and reliability
6. Identify opportunities for data acquisition
7. Data pipeline maintenance/testing.
8. ', 'mb-bank');

CREATE TABLE companies (
  id character varying(40) not null primary key,
  name character varying(300),
  description character varying(2000),
  slogan character varying(300),
  image_url varchar(500),
  cover_url varchar(500),
  sequence integer
);

create table if not exists contacts (
  id varchar(40) not null,
  name varchar(120),
  country varchar(120),
  company varchar(120),
  job_title varchar(120),
  email varchar(120),
  phone varchar(45),
  message varchar(1000),
  submitted_at timestamptz,
  contacted_by varchar(120),
  contacted_at timestamptz,
  primary key (id)
);
	 
insert into contacts (id,name,country,company,job_title,email,phone,message,submitted_at,contacted_by,contacted_at) values
	 ('E7UBXeHrp','Duc Nguyen','Vietnam','TMA','Manager','duc.n@tma.com.vn','93 334-7686','I want to hire 8 developers','2024-10-20 18:59:47.820962+07',null,null),
	 ('xRjjveHrM','Hieu Vo','Vietnam','TMA','Developer','hieu.v@tma.com.vn','123 456-78','I want to hire 6 developers','2024-10-20 19:01:04.940217+07',null,null),
	 ('l74fvAHrp','Phu Huynh','Vietname','FPT','Developer','phu.h@tma.com.vn','876 543-21','I want to hire 5 developers','2024-10-20 19:02:12.209824+07',null,null),
	 ('XTotvATrp','Tan Truong','Vietname','FPT','Senior Developer','tan.t@fpt.com.vn','876 543-21','I want to hire 4 developers','2024-10-20 19:02:39.317878+07',null,null),
	 ('SrmtXAH9p','Bao Nguyen','Vietname','Cho Tot','Senior Developer','bao.n@chotot.com.vn','876 543-21','I want to hire 4 developers','2024-10-20 19:03:10.218696+07',null,null),
	 ('hS1KKeH9M','Tin Hoang','Vietname','TMA','Senior Developer','tin.h@tma.com.vn','876 543-21','I want to hire 4 developers','2024-10-20 19:29:21.103008+07',null,null);
