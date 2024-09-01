use anchor_lang::prelude::*;

declare_id!("4NUErqfetf6cFHFt4jS7Hg1WZLk1cmUrUJKSdKCifZfj");

#[program]
pub mod blog {
    use super::*;
    
    pub fn create_blog(ctx: Context<CreateBlogPost>, title: String, body: String) -> Result<()> {
        let blog_post = &mut ctx.accounts.blog_post;
        blog_post.owner = ctx.accounts.user.key();
        blog_post.title = title.clone();
        blog_post.body = body;
        Ok(())
    }

    pub fn update_blog(ctx: Context<UpdateBlogPost>, _title: String, body: String)->Result<()>{
      let blog_post = &mut ctx.accounts.blog_post;
      blog_post.body = body;
      Ok(())
    }

    pub fn delete_blog(_ctx: Context<Delete>, _title: String)->Result<()>{
        Ok(())
    }
}


#[derive(Accounts)]
#[instruction(title: String)]
pub struct Delete<'info>{
#[account(
    mut,
        seeds = [user.key().as_ref(), title.as_bytes()],
        bump,
        close = user,
    )]
    pub blog_post: Account<'info, BlogAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}



#[derive(Accounts)]
#[instruction(title: String, body: String)]
pub struct UpdateBlogPost<'info>{
#[account(
    mut,
        seeds = [user.key().as_ref(), title.as_bytes()],
        bump,
        realloc = 8 + 32 + 4 + title.len() + 4 + body.len(),
        realloc::payer = user,
        realloc::zero = true
    )]
    pub blog_post: Account<'info, BlogAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String)]
pub struct CreateBlogPost<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 4 + 100 + 4 + 500,
        seeds = [user.key().as_ref(), title.as_bytes()],
        bump
    )]
    pub blog_post: Account<'info, BlogAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct BlogAccount {
    pub owner: Pubkey,
    pub title: String,
    pub body: String,
}