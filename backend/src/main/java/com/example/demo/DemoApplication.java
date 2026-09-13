package com.example.demo;

import com.example.demo.model.Book;
import com.example.demo.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.util.List;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner seedCatalogue(BookRepository bookRepository) {
		return args -> {
			List<Book> seedBooks = List.of(
				new Book(null, "The Midnight Library", "Matt Haig",
					"Fiction", new BigDecimal("14.99"), 22,
					"A novel about all the lives you could have lived.",
					"813.6-HAI", 4.4, "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg"),
				new Book(null, "Atomic Habits", "James Clear",
					"Non-Fiction", new BigDecimal("18.50"), 40,
					"Tiny changes, remarkable results.",
					"158.1-CLE", 4.8, "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg"),
				new Book(null, "Dune", "Frank Herbert",
					"Science Fiction", new BigDecimal("12.75"), 15,
					"A desert planet, a rare spice, and a boy who becomes a legend.",
					"813.54-HER", 4.7, "https://covers.openlibrary.org/b/isbn/9780441172719-L.jpg"),
				new Book(null, "Sapiens", "Yuval Noah Harari",
					"History", new BigDecimal("21.00"), 18,
					"A brief history of humankind.",
					"909-HAR", 4.6, "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg"),
				new Book(null, "The Silent Patient", "Alex Michaelides",
					"Thriller", new BigDecimal("13.25"), 9,
					"A psychotherapist becomes obsessed with treating a woman who refuses to speak.",
					"813.6-MIC", 4.3, "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg"),
				new Book(null, "Educated", "Tara Westover",
					"Memoir", new BigDecimal("16.40"), 12,
					"A memoir about the transformative power of education.",
					"921-WES", 4.7, "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg"),
				new Book(null, "Circe", "Madeline Miller",
					"Fantasy", new BigDecimal("15.10"), 27,
					"The story of the witch who turned Odysseus's men into swine.",
					"813.6-MIL", 4.6, "https://covers.openlibrary.org/b/isbn/9780316556347-L.jpg"),
				new Book(null, "Clean Code", "Robert C. Martin",
					"Technology", new BigDecimal("29.99"), 6,
					"A handbook of agile software craftsmanship.",
					"005.1-MAR", 4.2, "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg"),
				new Book(null, "The Creative Act", "Rick Rubin", "Non-Fiction", new BigDecimal("24.00"), 14,
					"A way of being that turns attention into meaningful work.", "700-RUB", 4.5,
					"https://covers.openlibrary.org/b/isbn/9780593652886-L.jpg"),
				new Book(null, "Project Hail Mary", "Andy Weir", "Science Fiction", new BigDecimal("17.80"), 19,
					"A lone astronaut wakes up with an impossible mission.", "813.6-WEI", 4.8,
					"https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg"),
				new Book(null, "Tomorrow, and Tomorrow, and Tomorrow", "Gabrielle Zevin", "Fiction", new BigDecimal("19.50"), 11,
					"A friendship shaped by games, ambition, and a lifetime of making things.", "813.6-ZEV", 4.6,
					"https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg"),
				new Book(null, "The Design of Everyday Things", "Don Norman", "Design", new BigDecimal("22.40"), 8,
					"How thoughtful design makes everyday objects work better.", "745.2-NOR", 4.4,
					"https://covers.openlibrary.org/b/isbn/9780465050659-L.jpg"),
				new Book(null, "Braiding Sweetgrass", "Robin Wall Kimmerer", "Nature", new BigDecimal("20.10"), 16,
					"Indigenous wisdom and scientific knowledge in conversation with the living world.", "305.8-KIM", 4.9,
					"https://covers.openlibrary.org/b/isbn/9781571313560-L.jpg"),
				new Book(null, "Pachinko", "Min Jin Lee", "Historical Fiction", new BigDecimal("18.90"), 13,
					"A sweeping story of one family across generations and borders.", "813.6-LEE", 4.7,
					"https://covers.openlibrary.org/b/isbn/9781455563920-L.jpg"),
				new Book(null, "The Creative Habit", "Twyla Tharp", "Creativity", new BigDecimal("16.75"), 7,
					"Practical rituals for making creativity a daily practice.", "153.3-THA", 4.3,
					"https://covers.openlibrary.org/b/isbn/9780743235273-L.jpg")
			);

			for (Book seedBook : seedBooks) {
				bookRepository.findByTitleIgnoreCase(seedBook.getTitle()).ifPresentOrElse(existing -> {
					if (!seedBook.getCoverUrl().equals(existing.getCoverUrl())) {
						existing.setCoverUrl(seedBook.getCoverUrl());
						bookRepository.save(existing);
					}
				}, () -> bookRepository.save(seedBook));
			}
		};
	}
}
