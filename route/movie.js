/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - genres
 *         - year
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         genres:
 *           type: string
 *           description: The book author
 *         year:
 *           type: string
 *           format: date
 *           description: The date the book was addes
 *       example:
 *         id: 1
 *         title: The New Turing Omnibus
 *         genres: Chomedy
 *         year: 2020
 */

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: The movies managing API
 * /movies:
 *   post:
 *     summary: Create a new movies
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *   responses:
 *     200:
 *       description: The created movie.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     500:
 *       description: Some server error
 * 
 */ 