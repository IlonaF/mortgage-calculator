<?php
/*
* Template Name: Calculator - mortgage
*/
?>

<?php get_header(); ?>

<div class="row">

	<div class="col-md-8">
		<main id="content" role="main" itemprop="mainContentOfPage" itemscope="itemscope" itemtype="http://schema.org/Blog">
			<div class="row">
				<div class="col-md-12">

					<?php while ( have_posts() ) : the_post(); ?>
						<article id="entry-<?php the_ID(); ?>" <?php post_class( 'entry' ); ?> itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost">
							<h2 class="entry-title" itemprop="headline">
								<?php the_title(); ?>
							</h2>

							<?php if ( has_post_thumbnail() ) : ?>
								<div class="entry-featured">
									<a class="ci-lightbox" href="<?php echo esc_url( olsen_light_get_image_src( get_post_thumbnail_id(), 'large' ) ); ?>">
										<?php the_post_thumbnail( 'post-thumbnail', array( 'itemprop' => 'image' ) ); ?>
									</a>
								</div>
							<?php endif; ?>

							<div class="entry-content">
								<?php the_content(); ?>
								<?php wp_link_pages(); ?>
							</div>
                            
                            <section class="calculator" id="mortgage">
                            	<div class="row">
                                	<div class="col-md-5">
                                    	<label>Loan amount</label>
                                    </div>
                                	<div class="col-md-4">
	                            		<input type="text" name="loan-amount" placeholder="100,000" />
                                    </div>
                                </div>
                            	<div class="row">
                                	<div class="col-md-5">
		                            	<label>Interest rate % p.a.</label>
                                    </div>
                                	<div class="col-md-4">
		                            	<input type="text" name="interest-rate" placeholder="5" />
                                    </div>
                                </div>
                            	<div class="row">
                                	<div class="col-md-5">
                                    	<label>Interest only</label>
                                    </div>
                                	<div class="col-md-4">
                                        <select name="interest-only">
                                          <option value="1">yes</option>
                                          <option value="0" selected="selected">no</option>
                                        </select>
                                    </div>
                                </div>
                            	<div class="row">
                                	<div class="col-md-5">
		                            	<label>Loan term if Repayment Mortgage</label>
                                    </div>
                                	<div class="col-md-4">
		                            	<input type="text" name="loan-term" placeholder="25" />
                                    </div>
                                </div>
                                <a class="button btn">Calculate</a>
                                <div class="results">
                                </div>
                            </section>

							<div class="entry-utils group">
								<?php get_template_part( 'part', 'social-sharing' ); ?>
							</div>

							<?php comments_template(); ?>

						</article>
					<?php endwhile; ?>

				</div>
			</div>
		</main>
	</div>

	<div class="col-md-4">
		<?php get_sidebar(); ?>
	</div>

</div>

<?php get_footer(); ?>

